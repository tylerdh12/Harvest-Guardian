import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Animated, TouchableOpacity } from 'react-native'
import { LeftAction } from '../Styles'
import { styles } from '../Styles/Styles'

interface LeftActionAddProps {
	progress: any
	dragX: any
}

export const LeftActionAdd: React.FunctionComponent<LeftActionAddProps> = ({
	progress,
	dragX,
}) => {
	const scale = dragX.interpolate({
		inputRange: [0, 110],
		outputRange: [0, 0.6],
		extrapolate: 'clamp',
	})

	return (
		<TouchableOpacity style={{ width: 110 }}>
			<LeftAction>
				<Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
					<Ionicons name="ios-add-circle" size={70} />
				</Animated.Text>
			</LeftAction>
		</TouchableOpacity>
	)
}
