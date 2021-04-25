import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Platform, View } from 'react-native'
import { AppTabs } from './AppTabs'
import Loader from './components/LoadingScreens/Loader'
import { SafeAreaView } from './components/Styles'
import { AuthContext } from './providers/AuthProvider'
import { AuthStack } from './stacks/Auth/AuthStack'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Onboarding from './components/Onboarding/Onboarding.js'

export const Routes = ({}) => {
	const { login, userData, authBasic } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [viewedOnboarding, setViewedOnboarding] = useState(false)

	const checkOnboarding = async () => {
		try {
			console.log('Onboarding before Setting: ' + viewedOnboarding)
			const value = await AsyncStorage.getItem('@viewedOnboarding')
			console.log('Value of Async Data: ' + value)
			value === null || value
				? setViewedOnboarding(false)
				: setViewedOnboarding(true)
		} catch (error) {
			console.log('Error @checkOnboarding: ' + error)
		} finally {
			console.log('Onboarding after Setting: ' + viewedOnboarding)
			setLoading(false)
		}
	}

	// get Async Storage '@viewedOnboarding'

	//if true set viewedOnboarding to true

	//if false set viewedOnboarding to false

	//catch errors and report to log

	useEffect(() => {
		if (Platform.OS === 'web') {
			try {
				AsyncStorage.getItem('authBasic')
					.then(userString => {
						if (userString) {
							login(authBasic)
						}
						setLoading(false)
					})
					.catch(err => {
						console.log('Login Error: ' + err)
						setLoading(false)
					})
			} catch (err) {
				console.error('Async Storage Login Error: ' + err)
			}
		} else {
			checkOnboarding()

			try {
				SecureStore.getItemAsync('authBasic')
					.then(userString => {
						if (userString) {
							login(authBasic)
						}
						setLoading(false)
					})
					.catch(err => {
						console.log('Login Error: ' + err)
						setLoading(false)
					})
			} catch (err) {
				console.error('Secure Storage Login Error: ' + err)
				setLoading(false)
			}
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
			{loading ? <Loader /> : userData ? <AppTabs /> : <AuthStack />}
		</NavigationContainer>
	)
}
