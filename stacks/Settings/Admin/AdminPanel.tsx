import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { styles } from '../../../components/Styles/Styles'
import {
	ButtonPrimary,
	ButtonPrimaryText,
	Container,
	LinkTitle,
	Text,
	TouchableOpacity,
	TouchableOpacityAlt,
} from './../../../components/Styles'

export const AdminPanel = ({ navigation }) => {
	return (
		<Container>
			<TouchableOpacityAlt
				style={{ padding: 5 }}
				onPress={() => {
					navigation.push('Create Seed')
				}}
			>
				<LinkTitle>Create a New Seed</LinkTitle>
			</TouchableOpacityAlt>
		</Container>
	)
}
