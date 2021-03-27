import React from 'react'
import { TouchableOpacity } from 'react-native'
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
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('Details', {
					data: item,
				})
			}}
		>
			<View style={{ backgroundColor: 'transparent' }}>
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
		</TouchableOpacity>
	)
}
