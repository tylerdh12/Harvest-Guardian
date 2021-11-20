import moment from 'moment'
import React from 'react'
import { View } from 'react-native'
import { harvestProgress, harvestProgressColor } from '../../utils/Utils'
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
