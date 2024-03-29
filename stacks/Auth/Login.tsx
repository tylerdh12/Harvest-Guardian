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
	SafeAreaView,
	TextInput,
	View,
} from '../../components/Styles'
import { AuthContext } from '../../providers/AuthProvider'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

	const { login } = useContext(AuthContext)

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
		if (Platform.OS === 'web') {
			AsyncStorage.getItem('userData').then(userData => {
				if (userData !== null) {
					try {
						dispatch({ type: 'alreadyAuth' })
						AsyncStorage.getItem('authBasic').then(authBasic => {
							login(authBasic)
						})
					} catch (error) {
						console.log(error)
					}
				}
			})
		} else {
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
		}
	}, [])

	/* ------- Primary Login Function Handler requires username, password ------- */

	async function loginWithUserPass(username, password) {
		dispatch({ type: 'login' })
		const rawLogin = password
		const token = encode(`${username}:${password}`)
		const authBasic = 'Basic ' + token
		try {
			if (Platform.OS === 'web') {
				await AsyncStorage.setItem('rawLogin', rawLogin)
				await AsyncStorage.setItem('authBasic', authBasic)
			} else {
				await SecureStore.setItemAsync('rawLogin', rawLogin)
				await SecureStore.setItemAsync('authBasic', authBasic)
			}
		} catch (error) {
			console.log(error)
		}

		await login(authBasic)

		if (Platform.OS === 'web') {
			AsyncStorage.getItem('userData').then(userData => {
				if (userData === null) {
					dispatch({ type: 'error', message: 'Invalid Email or Password' })
				}
			})
		} else {
			SecureStore.getItemAsync('userData').then(userData => {
				if (userData === null) {
					dispatch({ type: 'error', message: 'Invalid Email or Password' })
				}
			})
		}
	}

	/* ------------------------- Return for Login Stack ------------------------- */

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
		>
			<StatusBar style="light" />

			<SafeAreaView>
				{isLoading ? (
					Platform.OS === 'ios' ? (
						<LoadingSeed />
					) : (
						<ActivityIndicator size="large" />
					)
				) : (
					<>
						<Heading>Sign In</Heading>

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
								marginHorizontal: 15,
							}}
						>
							<ButtonPrimary
								disabled={isLoading}
								onPress={() => {
									loginWithUserPass(username, password)
								}}
							>
								{isLoading ? (
									<ButtonPrimaryText>Signing In...</ButtonPrimaryText>
								) : (
									<ButtonPrimaryText>Sign In</ButtonPrimaryText>
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
