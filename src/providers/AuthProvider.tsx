import axios from 'axios'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthProviderProps {
	children: any
	login?: (authBasic) => void
	logout?: () => void
	setErrorMessages?: string
	userData?: Object
	setUserData?: (userData) => void
}

export const AuthContext = React.createContext({
	authBasic: null,
	userData: null,
	setUserData: object => {},
	errorMessage: '',
	setErrorMessage: string => {},
	login: authBasic => {},
	logout: () => {},
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [userData, setUserData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const [authBasic, setAuthBasic] = useState(null)

	async function getUserData(authBasic) {
		setAuthBasic(authBasic)
		await axios({
			method: 'get',
			url: 'https://harvestguardian-rest-api.herokuapp.com/v1/user',
			headers: {
				Authorization: authBasic,
			},
		})
			.then(res => {
				setUserData(res.data)
				console.log(res.data.email + ' has Logged on')
				if (Platform.OS === 'web') {
					AsyncStorage.setItem('userData', JSON.stringify(res.data))
				} else {
					SecureStore.setItemAsync('userData', JSON.stringify(res.data))
				}
			})
			.catch(err => {
				if (err) {
					setErrorMessage(err.response.status)
				}
			})
	}

	return (
		<AuthContext.Provider
			value={{
				authBasic,
				userData,
				setUserData,
				errorMessage,
				setErrorMessage,
				login: authBasic => {
					return getUserData(authBasic)
				},
				logout: () => {
					console.log(userData.email + ' Logged out')
					setUserData(null)
					if (Platform.OS === 'web') {
						AsyncStorage.removeItem('userData')
						AsyncStorage.removeItem('authBasic')
						AsyncStorage.removeItem('userData')
						AsyncStorage.removeItem('rawLogin')
						AsyncStorage.removeItem('EXPO_CONSTANTS_INSTALLATION_ID')
					} else {
						SecureStore.deleteItemAsync('userData')
						SecureStore.deleteItemAsync('authBasic')
						SecureStore.deleteItemAsync('userData')
						SecureStore.deleteItemAsync('rawLogin')
						SecureStore.deleteItemAsync('EXPO_CONSTANTS_INSTALLATION_ID')
					}
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
