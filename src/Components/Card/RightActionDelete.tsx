import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import { RightAction } from '../../components/Styles'
import { styles } from '../Styles/Styles'

interface RightActionDeleteProps {
	progress: any
	dragX: any
}

export const RightActionDelete: React.FunctionComponent<RightActionDeleteProps> = ({
	progress,
	dragX,
}) => {
	const scale = dragX.interpolate({
		inputRange: [-100, 0],
		outputRange: [1, 0],
		extrapolate: 'clamp',
	})

	return (
		<TouchableOpacity style={{ width: 80 }}>
			<RightAction>
				<Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
					<Ionicons name="ios-trash" size={70} />
				</Animated.Text>
			</RightAction>
		</TouchableOpacity>
	)
}
