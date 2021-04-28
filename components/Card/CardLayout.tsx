import React, { useState, useEffect } from 'react'
import { TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { CardDetails } from './CardDetails'
import { CardImage } from './CardImage'
import ProgressBar from './ProgressBar'
import SpeciesTitle from './SpeciesTitle'
import { CardBody, View } from '../Styles'
import { Plants } from './../../data/plants.js'

interface CardLayoutProps {
	navigation: any
	item: any
	type: string
}

export const CardLayout: React.FunctionComponent<CardLayoutProps> = ({
	navigation,
	item,
	type,
}) => {
	const [plant, setPlant] = useState({ ...item })

	useEffect(() => {
		for (let i = 0; i < Plants.length; i++) {
			if (Plants[i]._id === item.seed) {
				setPlant(Plants[i])
			}
		}
	}, [])

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				navigation.navigate('Details', {
					data: item,
					plant: plant,
				})
			}}
		>
			<View style={styles.cardWrapper}>
				{type === 'plant' ? (
					<>
						<CardImage image={plant.images} />
						<CardBody>
							<SpeciesTitle species={plant.species} />
							<ProgressBar
								date_planted={item.date_planted}
								days_to_harvest={plant.days_to_harvest}
								days_to_germinate={plant.days_to_germinate}
							/>
							<CardDetails type={type} item={item} plant={plant} />
						</CardBody>
					</>
				) : (
					<>
						<CardImage image={item.images} />
						<CardBody>
							<CardDetails type={type} item={item} plant={plant} />
						</CardBody>
					</>
				)}
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	cardWrapper: {
		marginTop: 30,
		marginBottom: 10,
		marginHorizontal: 5,
		backgroundColor: 'transparent',
		width: '100%',
		maxWidth: 500,
		alignSelf: 'center',
	},
})
