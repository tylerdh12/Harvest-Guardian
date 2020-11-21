import axios from 'axios'
import { default as React, useContext, useState } from 'react'
import { ActivityIndicator, Button, Platform } from 'react-native'
import Loader from '../../../components/LoadingScreens/Loader'
import { ErrorText, Text, TextInput, View } from '../../../components/Styles'
import { AuthContext } from '../../../providers/AuthProvider'
import * as SecureStore from 'expo-secure-store'

interface ChangePasswordProps {}

export const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
	const {
		logout,
		userData,
		authBasic,
		setUserData,
		setErrorMessage,
	} = useContext<any>(AuthContext)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const [password, changePassword] = useState('')
	const [retypePassword, changeRetypePassword] = useState('')

	function changeUserData() {
		setIsLoading(true)
		SecureStore.getItemAsync('authBasic').then(authBasic => {
			axios({
				method: 'patch',
				url: `https://harvestguardian-rest-api.herokuapp.com/v1/user/${userData._id}`,
				headers: {
					Authorization: authBasic,
				},
				data: {
					first_name: userData.first_name,
					last_name: userData.last_name,
					email: userData.email,
					password: password,
					zip_code: userData.zip_code,
					account_type: userData.account_type,
					zone: userData.zone,
					active: true,
				},
			})
				.then(res => {
					if (res.status === 401) {
						console.log('Response 401')
						console.log(res)
					} else if (res.status === 500) {
						console.log('Response Error 500')
						console.log(res)
					} else {
						logout()
					}
				})
				.then(() => setIsLoading(false))
		})
	}

	function SubmitHandler() {
		password === retypePassword
			? changeUserData()
			: setError("Passwords Don't Match")
	}

	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			{isLoading ? (
				<View style={{ padding: 25 }}>
					<Text style={{ marginBottom: 5, textAlign: 'center' }}>
						Changing Password
					</Text>
					<Text style={{ marginBottom: 25, textAlign: 'center' }}>
						Please Wait...
					</Text>
					{Platform.OS === 'ios' ? <Loader /> : <ActivityIndicator />}
				</View>
			) : (
				<>
					<Text
						style={{
							padding: 4,
							fontWeight: '400',
							fontSize: 16,
							marginTop: 20,
						}}
					>
						Password
					</Text>
					<TextInput
						style={{
							height: 40,
							borderColor: 'gray',
							borderWidth: 2,
							borderRadius: 5,
							padding: 5,
							marginBottom: 10,
							width: '60%',
							maxWidth: 300,
						}}
						secureTextEntry={true}
						onChangeText={(password: React.SetStateAction<string>) =>
							changePassword(password)
						}
						value={password}
					/>
					<Text
						style={{
							padding: 4,
							fontWeight: '400',
							fontSize: 16,
						}}
					>
						Retype Password
					</Text>
					<TextInput
						style={{
							height: 40,
							borderColor: 'gray',
							borderWidth: 2,
							borderRadius: 5,
							padding: 5,
							marginBottom: 10,
							width: '60%',
							maxWidth: 300,
						}}
						secureTextEntry={true}
						onChangeText={(password: React.SetStateAction<string>) =>
							changeRetypePassword(password)
						}
						value={retypePassword}
					/>
					{error !== '' ? <ErrorText>{error}</ErrorText> : null}
					<Button
						title="Change Password"
						onPress={SubmitHandler}
						color="green"
						accessibilityLabel="Submit a new password"
					/>
				</>
			)}
		</View>
	)
}

interface ChangeZoneProps {}
