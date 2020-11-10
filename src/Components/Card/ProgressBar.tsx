import moment from 'moment'
import React from 'react'
import { View } from 'react-native'
import { ViewAlt } from '../Styles'

interface progressBarProps {
	date_planted: any
	days_to_harvest: any
	days_to_germinate: any
}

const ProgressBar: React.FunctionComponent<progressBarProps> = ({
	date_planted,
	days_to_harvest,
	days_to_germinate,
}) => {
	function harvestProgress(date_planted, days_to_harvest) {
		const daysPlantedToNow = moment().diff(date_planted, 'days')

		return (daysPlantedToNow / parseInt(days_to_harvest)) * 100 < 100
			? (daysPlantedToNow / parseInt(days_to_harvest)) * 100
			: 100
	}

	function harvestProgressColor(
		date_planted,
		days_to_harvest,
		days_to_germinate,
	) {
		const daysPlantedToNow = moment().diff(date_planted, 'days')
		if (daysPlantedToNow <= parseInt(days_to_germinate)) {
			return 'yellow'
		} else if (daysPlantedToNow <= parseInt(days_to_harvest)) {
			return 'rgb(148, 224, 136)'
		} else {
			return 'tomato'
		}
	}

	return (
		<View
			style={{
				marginTop: 10,
				height: 10,
				backgroundColor: 'transparent',
				borderStyle: 'solid',
				borderWidth: 1,
				borderColor: harvestProgressColor(
					date_planted,
					days_to_harvest,
					days_to_germinate,
				),
				borderRadius: 10,
				width: '100%',
			}}
		>
			<ViewAlt
				style={{
					height: 8,
					backgroundColor: harvestProgressColor(
						date_planted,
						days_to_harvest,
						days_to_germinate,
					),
					borderRadius: 10,
					width: `${harvestProgress(date_planted, days_to_harvest)}%`,
					flex: 1,
				}}
			></ViewAlt>
		</View>
	)
}

export default ProgressBar
