import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Dimensions, Platform } from 'react-native'
import { Container, Text } from '../../components/Styles'
import { useTheme } from '../../themes'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Preferences() {
	const theme = useTheme()
	const [metric, setMetric] = useState(false)
	const [celsius, setCelsius] = useState(false)

	useEffect(() => {
		return () => {
			if (Platform.OS === 'web') {
				AsyncStorage.setItem('metric', JSON.stringify(metric))
			} else {
				SecureStore.setItemAsync('metric', JSON.stringify(metric))
			}
		}
	}, [metric])

	useEffect(() => {
		return () => {
			if (Platform.OS === 'web') {
				AsyncStorage.setItem('celsius', JSON.stringify(celsius))
			} else {
				SecureStore.setItemAsync('celsius', JSON.stringify(celsius))
			}
		}
	}, [celsius])

	const { width } = Dimensions.get('window')

	return (
		<Container>
			<View style={{ width: width }}>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: 10,
					}}
				>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'space-evenly',
							flexDirection: 'row',
							backgroundColor: 'grey',
							borderRadius: 40,
							width: 250,
							height: 50,
							margin: 10,
						}}
					>
						<TouchableWithoutFeedback
							style={
								celsius ? styles.toggleButton : styles.selectedToggleButton
							}
							onPress={() => setCelsius(false)}
						>
							<Text style={styles.labelText}>°F</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback
							style={
								celsius ? styles.selectedToggleButton : styles.toggleButton
							}
							onPress={() => setCelsius(true)}
						>
							<Text style={styles.labelText}>°C</Text>
						</TouchableWithoutFeedback>
					</View>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'space-evenly',
							flexDirection: 'row',
							backgroundColor: 'grey',
							borderRadius: 40,
							width: 250,
							height: 50,
							margin: 10,
						}}
					>
						<TouchableWithoutFeedback
							style={metric ? styles.toggleButton : styles.selectedToggleButton}
							onPress={() => setMetric(false)}
						>
							<Text style={styles.labelText}>Inches</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback
							style={metric ? styles.selectedToggleButton : styles.toggleButton}
							onPress={() => setMetric(true)}
						>
							<Text style={styles.labelText}>Centimeter</Text>
						</TouchableWithoutFeedback>
					</View>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'space-evenly',
							flexDirection: 'row',
							backgroundColor: 'grey',
							borderRadius: 40,
							width: 250,
							height: 50,
							margin: 10,
						}}
					>
						<TouchableWithoutFeedback
							style={
								theme.mode === 'dark'
									? styles.toggleButton
									: styles.selectedToggleButton
							}
							onPress={() => theme.setMode('light')}
						>
							<Text style={styles.labelText}>Light</Text>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback
							style={
								theme.mode === 'dark'
									? styles.selectedToggleButton
									: styles.toggleButton
							}
							onPress={() => theme.setMode('dark')}
						>
							<Text style={styles.labelText}>Dark</Text>
						</TouchableWithoutFeedback>
					</View>
				</View>
			</View>
		</Container>
	)
}

export default Preferences

const styles = StyleSheet.create({
	labelText: { color: '#000', fontWeight: '700' },
	toggleButton: {
		padding: 10,
		width: 115,
		justifyContent: 'center',
		borderRadius: 40,
		alignItems: 'center',
	},

	selectedToggleButton: {
		padding: 10,
		width: 115,
		justifyContent: 'center',
		borderRadius: 40,
		alignItems: 'center',
		backgroundColor: '#eee',
	},
})
