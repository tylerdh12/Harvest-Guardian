import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'

// interface ItemProps {
// 	item: {
// 		id: string
// 		title: string
// 		description: string
// 		image: any
// 	}
// }

const OnboardingItem = ({ item }) => {
	const width = Dimensions.get('window').width

	return (
		<View style={[styles.container, { width }]}>
			<Image
				source={item.image}
				style={[styles.image, { width, resizeMode: 'contain' }]}
			/>
			<View style={{ flex: 0.3 }}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
		</View>
	)
}
export default OnboardingItem

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 0.7,
		justifyContent: 'center',
	},
	title: {
		fontWeight: '800',
		fontSize: 28,
		marginBottom: 10,
		color: '#493d8a',
		textAlign: 'center',
	},
	description: {
		fontWeight: '300',
		color: '#62656b',
		textAlign: 'center',
		paddingHorizontal: 64,
	},
})
