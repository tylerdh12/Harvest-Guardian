import React, { useState, useEffect } from 'react'
import { Text } from './Styles'
import { StyleSheet, Dimensions } from 'react-native'

interface Props {
	step: {
		directions: string
		image: string
	}
	index: number
	key: number
}

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

export const StepsMaker: React.FC<Props> = ({ step, index }) => {
	const [dimensions, setDimensions] = useState({ window, screen })

	const onChange = ({ window, screen }) => {
		setDimensions({ window, screen })
	}

	useEffect(() => {
		Dimensions.addEventListener('change', onChange)
		return () => {
			Dimensions.removeEventListener('change', onChange)
		}
	})

	return (
		<Text
			key={index}
			style={(styles.text, { width: dimensions.window.width - 25 })}
		>
			Step {index + 1}: {step.directions}
		</Text>
	)
}

const styles = StyleSheet.create({
	text: {
		textAlign: 'left',
		fontSize: 22,
		fontWeight: '300',
		marginVertical: 32,
	},
})
