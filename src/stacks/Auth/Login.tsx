import { Ionicons } from '@expo/vector-icons'
/* -------------------------------------------------------------------------- */
/* ------------------------------ Login Screen ------------------------------ */
/* -------------------------------------------------------------------------- */
/* -------------------------- Imports and Includes -------------------------- */
import { encode } from 'base-64'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useEffect, useReducer } from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import LoadingSeed from '../../components/LoadingScreens/LoadingSeed'
import {
	Button,
	ButtonPrimary,
	ButtonPrimaryText,
	ButtonText,
	ErrorText,
	Heading,
	KeyboardAvoidingView,
	Label,
	LinkTitle,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	View,
} from '../../components/Styles'
import { AuthContext } from '../../providers/AuthProvider'
import * as SecureStore from 'expo-secure-store'

/* --------------------------- Login Stack Reducer -------------------------- */

function loginReducer(state, action) {
	switch (action.type) {
		case 'field': {
			return {
				...state,
				[action.field]: action.value,
			}
		}
		case 'login': {
			return {
				...state,
				isLoading: true,
				isLoggedIn: false,
				error: '',
			}
		}
		case 'logout': {
			return {
				...state,
				isLoading: false,
				isLoggedIn: false,
				user: {},
				error: '',
				username: '',
				password: '',
			}
		}
		case 'success': {
			return {
				...state,
				user: action.payload,
				isLoggedIn: true,
				isLoading: false,
				username: '',
				password: '',
			}
		}
		case 'error': {
			return {
				...state,
				isLoading: false,
				isLoggedIn: false,
				error: action.message,
			}
		}
		case 'alreadyAuth': {
			return {
				...state,
				isLoading: true,
				isLoggedIn: false,
				authData: action.username,
			}
		}
		default:
			break
	}
	return state
}

/* ---------------------- Primary Login Function Stack ---------------------- */

function Login({ navigation }) {
	/* -- Import useContext from Auth Context to Use login() and Error Reports -- */

	const { login, logout } = useContext(AuthContext)

	/* ------------------- Reducer Variables to Control State ------------------- */

	const [
		{ username, password, isLoading, error, user, isLoggedIn },
		dispatch,
	] = useReducer(loginReducer, {
		username: '',
		password: '',
		isLoading: false,
		error: '',
		user: {},
		authBasic: '',
		isLoggedIn: false,
	})

	/* --------- useEffect Calls Auto Login if authBasic in SecureStorage -------- */

	useEffect(() => {
		SecureStore.getItemAsync('userData').then(userData => {
			if (userData !== null) {
				try {
					dispatch({ type: 'alreadyAuth' })
					SecureStore.getItemAsync('authBasic').then(authBasic => {
						login(authBasic)
					})
				} catch (error) {
					console.log(error)
				}
			}
		})
	}, [])

	/* ------- Primary Login Function Handler requires username, password ------- */

	async function loginWithUserPass(username, password) {
		dispatch({ type: 'login' })
		const rawLogin = password
		const token = encode(`${username}:${password}`)
		const authBasic = 'Basic ' + token
		try {
			await SecureStore.setItemAsync('rawLogin', rawLogin)
			await SecureStore.setItemAsync('authBasic', authBasic)
		} catch (error) {
			console.log(error)
		}

		await login(authBasic)

		SecureStore.getItemAsync('userData').then(userData => {
			if (userData === null) {
				dispatch({ type: 'error', message: 'Invalid Email or Password' })
			}
		})
	}

	/* ------------------------- Return for Login Stack ------------------------- */

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
		>
			<StatusBar style="light" />

			<SafeAreaView>
				<TouchableOpacity
					style={{
						position: 'absolute',
						borderRadius: 15,
						height: 25,
						width: 25,
						alignItems: 'center',
						justifyContent: 'center',
						bottom: 20,
						right: 20,
					}}
					onPress={() => {
						let keys = [
							'authBasic',
							'userData',
							'rawLogin',
							'EXPO_CONSTANTS_INSTALLATION_ID',
						]
						keys.map(key => {
							SecureStore.deleteItemAsync(key)
							alert(key + ' has been removed')
						})
					}}
				>
					<LinkTitle
						style={{
							margin: 0,
							padding: 2,
							textAlign: 'center',
							top: -10.5,
							left: -7,
							color: 'grey',
						}}
					>
						<Ionicons name="ios-warning" size={18} />
					</LinkTitle>
				</TouchableOpacity>
				{isLoading ? (
					Platform.OS === 'ios' ? (
						<LoadingSeed />
					) : (
						<ActivityIndicator size="large" />
					)
				) : (
					<>
						<Heading>Login</Heading>

						<View
							style={{
								width: '100%',
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<View style={{ width: '70%', alignItems: 'center' }}>
								<Label>Email</Label>

								<TextInput
									blurOnSubmit
									keyboardType="email-address"
									autoFocus={true}
									onChangeText={e =>
										dispatch({ type: 'field', field: 'username', value: e })
									}
									value={username}
								/>
							</View>
							<View style={{ width: '70%', alignItems: 'center' }}>
								<Label>Password</Label>

								<TextInput
									blurOnSubmit
									secureTextEntry={true}
									onChangeText={e =>
										dispatch({ type: 'field', field: 'password', value: e })
									}
									onSubmitEditing={() => loginWithUserPass(username, password)}
									value={password}
								/>
							</View>
							{error !== '' ? <ErrorText>{error}</ErrorText> : null}
						</View>
						<View
							style={{
								alignItems: 'center',
								flexDirection: 'column',
								justifyContent: 'space-evenly',
								margin: 15,
							}}
						>
							<ButtonPrimary
								disabled={isLoading}
								onPress={() => {
									loginWithUserPass(username, password)
								}}
							>
								{isLoading ? (
									<ButtonPrimaryText>Logging In...</ButtonPrimaryText>
								) : (
									<ButtonPrimaryText>Log In</ButtonPrimaryText>
								)}
							</ButtonPrimary>
							<Button
								onPress={() => {
									navigation.navigate('Register')
								}}
							>
								<ButtonText>Don't have an account?</ButtonText>
							</Button>
						</View>
					</>
				)}
			</SafeAreaView>
		</KeyboardAvoidingView>
	)

	/* --------------------------- End of Login Stack --------------------------- */
}

export default Login
