import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ActivityIndicator, Platform, Button } from 'react-native'
import Loader from '../../../components/LoadingScreens/Loader'
import { ErrorText, Text, TextInput, View } from '../../../components/Styles'
import { AuthContext } from '../../../providers/AuthProvider'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ChangeZipProps {
	userData?: {
		__v: number
		_id: string
		account_type: string
		active: boolean
		email: string
		first_name: string
		last_name: string
		password: string
		zip_code: number
		zone: string
	}
	zip_code: number
	navigation: any
}

export const ChangeZip: React.FC<ChangeZipProps> = ({ navigation }) => {
	const { logout, userData, authBasic, setUserData } = useContext<any>(
		AuthContext,
	)
	const [isLoading, setIsLoading] = useState(false)
	const [zipCode, changeZip] = useState(userData.zip_code)

	async function submitZipChange() {
		setIsLoading(true)
		try {
			if (Platform.OS === 'web') {
				await AsyncStorage.getItem('rawLogin').then(response =>
					!response
						? console.log('No password stored')
						: response.length > 0
						? AsyncStorage.getItem('authBasic').then(authBasic => {
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
										password: response,
										zip_code: zipCode,
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
											console.log(`Zip Code has been changed to: ${zipCode}`)
											navigation.goBack()
										}
									})
									.then(() => {
										setIsLoading(false)
									})
						  })
						: console.log('No response found'),
				)
			} else {
				await SecureStore.getItemAsync('rawLogin').then(response =>
					!response
						? console.log('No password stored')
						: response.length > 0
						? SecureStore.getItemAsync('authBasic').then(authBasic => {
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
										password: response,
										zip_code: zipCode,
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
											console.log(`Zip Code has been changed to: ${zipCode}`)
											navigation.goBack()
										}
									})
									.then(() => {
										setIsLoading(false)
									})
						  })
						: console.log('No response found'),
				)
			}
		} catch (error) {
			console.log(error)
		}
		setIsLoading(false)
	}

	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			{isLoading ? (
				<View style={{ padding: 25 }}>
					<Text style={{ marginBottom: 5, textAlign: 'center' }}>
						Changing Zip Code
					</Text>
					<Text style={{ marginBottom: 25, textAlign: 'center' }}>
						Please Wait...
					</Text>
					{Platform.OS === 'ios' ? (
						<Loader />
					) : (
						<ActivityIndicator size="large" />
					)}
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
						Zip Code
					</Text>
					<TextInput
						autoCompleteType="postal-code"
						keyboardType="numeric"
						maxLength={5}
						textContentType="postalCode"
						onChangeText={text => {
							changeZip(text)
						}}
						value={String(zipCode)}
					/>
					<Button
						title="Change Zip Code"
						onPress={submitZipChange}
						accessibilityLabel="Submit Zip Code Change"
					/>
				</>
			)}
		</View>
	)
}
