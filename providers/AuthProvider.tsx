import React, { useState } from 'react'
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserData } from '../utils/Utils'

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

	return (
		<AuthContext.Provider
			value={{
				authBasic,
				userData,
				setUserData,
				errorMessage,
				setErrorMessage,
				login: authBasic => {
					return getUserData(
						authBasic,
						setAuthBasic,
						setUserData,
						setErrorMessage,
					)
				},
				logout: () => {
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
