/* -------------------------------------------------------------------------- */
/* ----------------------------- Register Screen ---------------------------- */
/* -------------------------------------------------------------------------- */

/* -------------------------- Imports and Includes -------------------------- */

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
import {
	ValidatePassword,
	RegisterUser,
	getGrowingZoneWithZip,
} from '../../utils/Utils'

/* ----------------------------- Register Stack ----------------------------- */

function Register({ navigation }) {
	const [firstName, changeFirstName] = useState('')
	const [lastName, changeLastName] = useState('')
	const [zipCode, changeZipCode] = useState('')
	const [zone, setZone] = useState('')
	const [email, changeEmail] = useState('')
	const [password, changePassword] = useState('')
	const [validPassword, setValidPassword] = useState(true)
	const [reenterPassword, changeReenterPassword] = useState('')
	const [passwordError, setPasswordError] = useState('')

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
		>
			<SafeAreaView>
				<Heading>Register a New Account</Heading>
				<ScrollView style={{ width: '100%' }}>
					<View
						style={{
							width: '100%',
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{/* <View style={{ width: '70%', alignItems: 'center' }}>
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
						</View> */}
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
							<Label>Password</Label>
							<TextInput
								secureTextEntry={true}
								onChangeText={password => {
									ValidatePassword({
										password,
										setValidPassword,
										setPasswordError,
									})
									changePassword(password)
								}}
								value={password}
							/>
							{validPassword === false ? (
								<ErrorText>
									8 characters 1 uppercase 1 lowercase 1 special character 1
									number
								</ErrorText>
							) : null}
						</View>
						{/* <View style={{ width: '70%', alignItems: 'center' }}>
							<Label>Re-enter Password</Label>
							<TextInput
								secureTextEntry={true}
								onChangeText={reenterPassword => {
									changeReenterPassword(reenterPassword)
								}}
								value={reenterPassword}
							/>
						</View> */}
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
										getGrowingZoneWithZip(zipCode, setZone)
									}
								}}
								value={zipCode}
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
								RegisterUser({
									navigation,
									password,
									reenterPassword,
									firstName,
									lastName,
									zipCode,
									email,
									zone,
								})
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
