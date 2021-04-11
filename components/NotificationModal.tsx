import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert, Modal, TouchableHighlight } from 'react-native'
import { Text, TouchableOpacity, View } from './Styles'

const NotificationModal = notify => {
	const [modalVisible, setModalVisible] = useState(false)
	return (
		<View style={{ backgroundColor: 'transparent' }}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.')
				}}
			>
				<View style={{ backgroundColor: 'transparent', marginTop: 20 }}>
					<View
						style={{
							margin: 20,
							borderRadius: 20,
							padding: 35,
							alignItems: 'center',
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							elevation: 5,
						}}
					>
						<TouchableHighlight
							style={{
								marginRight: 0,
								borderRadius: 20,
								padding: 10,
								elevation: 2,
								position: 'absolute',
								right: 10,
								top: 10,
							}}
							onPress={() => {
								setModalVisible(!modalVisible)
							}}
						>
							<Text
								style={{
									fontWeight: 'bold',
									textAlign: 'center',
								}}
							>
								X
							</Text>
						</TouchableHighlight>
						<Text>Notifications</Text>
						{notify.length >= 0
							? notify.forEach(notification => {
									return <Text>{notification}</Text>
							  })
							: null}
					</View>
				</View>
			</Modal>

			<TouchableOpacity
				style={{ backgroundColor: 'transparent' }}
				onPress={() => {
					setModalVisible(true)
				}}
			>
				<Ionicons
					style={{ paddingRight: 16 }}
					name="ios-notifications-outline"
					size={24}
					color="white"
				/>
			</TouchableOpacity>
		</View>
	)
}

export default NotificationModal
