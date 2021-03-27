import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { AppTabs } from './AppTabs'
import Loader from './components/LoadingScreens/Loader'
import { SafeAreaView } from './components/Styles'
import { AuthContext } from './providers/AuthProvider'
import { AuthStack } from './stacks/Auth/AuthStack'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Routes = ({}) => {
	const { login, userData, authBasic } = useContext(AuthContext)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (Platform.OS === 'web') {
			console.log('using Web')
			try {
				AsyncStorage.getItem('authBasic')
					.then(userString => {
						if (userString) {
							login(authBasic)
						}
						setLoading(false)
					})
					.catch(error => {
						console.log(error)
						setLoading(false)
					})
			} catch (err) {
				console.error(err)
			}
		} else
			try {
				SecureStore.getItemAsync('authBasic')
					.then(userString => {
						if (userString) {
							login(authBasic)
						}
						setLoading(false)
					})
					.catch(error => {
						console.log(error)
						setLoading(false)
					})
			} catch (err) {
				console.error(err)
				setLoading(false)
			}
	}, [])

	if (loading) {
		return (
			<SafeAreaView>
				{Platform.OS === 'ios' ? (
					<Loader />
				) : (
					<ActivityIndicator size="large" />
				)}
			</SafeAreaView>
		)
	}

	return (
		<NavigationContainer>
			{userData ? <AppTabs /> : <AuthStack />}
		</NavigationContainer>
	)
}
