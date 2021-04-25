import React, { useEffect, useRef } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View, Animated } from 'react-native'
import Svg, { G, Circle } from 'react-native-svg'

// interface NextButtonProps {
// 	percentage: number
// 	scrollTo: any
// }

const NextButton = ({ percentage, scrollTo }) => {
	const size = 128
	const strokeWidth = 2
	const center = size / 2
	const radius = size / 2 - strokeWidth / 2
	const circumference = 2 * Math.PI * radius

	const progressAnimation = useRef(new Animated.Value(0)).current
	const progressRef = useRef(null)

	const animation = toValue => {
		return Animated.timing(progressAnimation, {
			toValue,
			duration: 250,
			useNativeDriver: true,
		}).start()
	}

	useEffect(() => {
		animation(percentage)
	}, [percentage])

	useEffect(() => {
		progressAnimation.addListener(value => {
			const strokeDashoffset =
				circumference - (circumference * value.value) / 100
			if (progressRef?.current) {
				progressRef.current.setNativeProps({ strokeDashoffset })
			}
		})
		return () => {
			progressAnimation.removeAllListeners()
		}
	}, [])

	return (
		<View style={styles.container}>
			<Svg width={size} height={size}>
				<G rotation="-90" origin={center}>
					<Circle
						stroke="#E6E7E8"
						cx={center}
						cy={center}
						r={radius}
						strokeWidth={strokeWidth}
					/>
					<Circle
						ref={progressRef}
						stroke="#f4338f"
						cx={center}
						cy={center}
						r={radius}
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
						strokeDashoffset={circumference}
					/>
				</G>
			</Svg>
			<TouchableOpacity
				onPress={scrollTo}
				style={styles.button}
				activeOpacity={0.6}
			>
				<AntDesign name="arrowright" size={32} color="#fff" />
			</TouchableOpacity>
		</View>
	)
}

export default NextButton

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		position: 'absolute',
		backgroundColor: '#f4338f',
		borderRadius: 100,
		padding: 20,
	},
})