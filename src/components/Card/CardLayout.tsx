import React from 'react'
import { TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { CardDetails } from './CardDetails'
import { CardImage } from './CardImage'
import ProgressBar from './ProgressBar'
import SpeciesTitle from './SpeciesTitle'
import { CardBody, View } from '../Styles'

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
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				navigation.navigate('Details', {
					data: item,
				})
			}}
		>
			<View style={styles.cardWrapper}>
				{type === 'plant' ? (
					<>
						<CardImage image={item.seed.images} />
						<CardBody>
							<SpeciesTitle species={item.seed.species} />
							<ProgressBar
								date_planted={item.date_planted}
								days_to_harvest={item.seed.days_to_harvest}
								days_to_germinate={item.seed.days_to_germinate}
							/>
							<CardDetails type={type} item={item} />
						</CardBody>
					</>
				) : (
					<>
						<CardImage image={item.images} />
						<CardBody>
							<CardDetails type={type} item={item} />
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
	},
})
