/* -------------------------------------------------------------------------- */
/* ----------------------------- Register Screen ---------------------------- */
/* -------------------------------------------------------------------------- */

/* -------------------------- Imports and Includes -------------------------- */

import { Picker } from '@react-native-community/picker'
import axios from 'axios'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import { GrowingZoneSelector } from '../../components/Forms/GrowingZoneSelector'
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
	ScrollView,
	TextInput,
	View,
} from '../../components/Styles'
import { ValidatePassword } from '../../utils/Utils'

/* ----------------------------- Register Stack ----------------------------- */

function Register({ navigation }) {
	const [firstName, changeFirstName] = useState('')
	const [firstNameError, changeFirstNameError] = useState('')
	const [lastName, changeLastName] = useState('')
	const [lastNameError, changeLastNameError] = useState('')
	const [zipCode, changeZipCode] = useState('')
	const [zipCodeError, changeZipCodeError] = useState('')
	const [zone, setZone] = useState('')
	const [email, changeEmail] = useState('')
	const [emailError, changeEmailError] = useState('')
	const [password, changePassword] = useState('')
	const [validPassword, setValidPassword] = useState(true)
	const [passwordError, setPasswordError] = useState('')
	const [reenterpassword, changeReenterPassword] = useState('')
	const [reenterpasswordError, changeReenterPasswordError] = useState('')

	async function RegisterUser() {
		if (password === reenterpassword) {
			const newUser = {
				first_name: firstName,
				last_name: lastName,
				zip_code: zipCode,
				email: email,
				password: password,
				zone: zone,
				account_type: 'user',
				active: true,
			}

			axios({
				method: 'post',
				url: 'https://harvestguardian-rest-api.herokuapp.com/v1/user',

				data: newUser,
			}).then(res => {
				if (res.status === 401) {
					console.log('Response 401')
					console.log(res)
				} else if (res.status === 201) {
					navigation.navigate('Login')
				} else {
					console.log(res)
				}
			})

			console.log(newUser)
		} else {
			setPasswordError("Passwords Don't Match")
		}
	}

	function getGrowingZoneWithZip(zipCode) {
		axios({
			method: 'GET',
			url: `https://phzmapi.org/${zipCode}.json`,
		}).then(res => {
			if (res.status === 200) {
				setZone(res.data.zone)
			} else {
				console.log(res)
			}
		})
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
		>
			<SafeAreaView>
				<Heading>Create a New Account</Heading>
				<ScrollView style={{ width: '100%' }}>
					<View
						style={{
							width: '100%',
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View style={{ width: '70%', alignItems: 'center' }}>
							<Label>First Name</Label>
							<TextInput
								autoFocus={true}
								onChangeText={firstName => changeFirstName(firstName)}
								value={firstName}
							/>
						</View>
						<View style={{ width: '70%', alignItems: 'center' }}>
							<Label>Last Name</Label>
							<TextInput
								onChangeText={lastName => changeLastName(lastName)}
								value={lastName}
							/>
						</View>
						<View style={{ width: '70%', alignItems: 'center' }}>
							<Label>Zip Code</Label>
							<TextInput
								autoCompleteType="postal-code"
								keyboardType="number-pad"
								maxLength={5}
								textContentType="postalCode"
								onChangeText={zipCode => {
									changeZipCode(zipCode)
									if (zipCode.length === 5) {
										getGrowingZoneWithZip(zipCode)
									}
								}}
								value={zipCode}
							/>
						</View>
						<View style={{ width: '70%', alignItems: 'center' }}>
							<Label>Email</Label>
							<TextInput
								autoCompleteType="email"
								keyboardType="email-address"
								onChangeText={email => changeEmail(email)}
								value={email}
							/>
						</View>
						<View style={{ width: '70%', alignItems: 'center' }}>
							{passwordError !== '' ? (
								<ErrorText style={{ padding: 10 }}>{passwordError}</ErrorText>
							) : null}
							<Label>Password</Label>
							<TextInput
								secureTextEntry={true}
								onChangeText={password => {
									ValidatePassword(password, validPassword, setValidPassword)
									changePassword(password)
								}}
								value={password}
							/>
							{validPassword ? null : (
								<ErrorText>8 characters or longer</ErrorText>
							)}
						</View>
						<View style={{ width: '70%', alignItems: 'center' }}>
							<Label>Re-enter Password</Label>
							<TextInput
								secureTextEntry={true}
								onChangeText={reenterPassword => {
									ValidatePassword(
										reenterPassword,
										validPassword,
										setValidPassword,
									)
									changeReenterPassword(reenterPassword)
								}}
								value={reenterpassword}
							/>
						</View>
						<GrowingZoneSelector zone={zone} setZone={setZone} />
					</View>

					<View
						style={{
							marginTop: 10,
							alignItems: 'center',
							flexDirection: 'column',
							justifyContent: 'space-evenly',
						}}
					>
						<ButtonPrimary
							style={{ margin: 10 }}
							onPress={() => {
								RegisterUser()
							}}
						>
							<ButtonPrimaryText>Register</ButtonPrimaryText>
						</ButtonPrimary>
						<Button
							style={{ margin: 10 }}
							onPress={() => {
								navigation.navigate('Login')
							}}
						>
							<ButtonText>Already have an account?</ButtonText>
						</Button>
					</View>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}

export default Register
