import moment from 'moment'
import React from 'react'
import { Text, ViewAlt } from '../Styles'

interface CardDetailsProps {
	item: {
		date_planted: Date
		species?: String
		days_to_harvest?: Number
	}
	plant: {
		days_to_harvest: Number
	}
	type: string
}

export const CardDetails: React.FunctionComponent<CardDetailsProps> = ({
	type,
	item,
	plant,
}) => {
	const datePlanted = date_planted => {
		return moment(date_planted).format('l')
	}

	function dateToBeHarvested(planted, harvest) {
		const dateToHarvest = moment(planted).add(parseInt(harvest), 'days')
		const numberOfDays = moment().diff(dateToHarvest, 'days')
		if (Math.sign(numberOfDays) == -1) {
			return moment(dateToHarvest).format('l')
		} else {
			return 'Ready'
		}
	}

	return type === 'plant' ? (
		<ViewAlt style={{ flexDirection: 'row' }}>
			<ViewAlt style={{ width: '50%' }}>
				<Text
					style={{
						textAlign: 'left',
						marginTop: 15,
						marginBottom: 5,
						fontWeight: '500',
					}}
				>
					Date Planted
				</Text>
				<Text style={{ textAlign: 'left', marginTop: 5 }}>
					{datePlanted(item.date_planted)}
				</Text>
			</ViewAlt>
			<ViewAlt style={{ width: '50%' }}>
				<Text
					style={{
						textAlign: 'right',
						marginTop: 15,
						marginBottom: 5,
						fontWeight: '500',
					}}
				>
					Day to Harvest
				</Text>
				<Text
					style={{
						textAlign: 'right',
						marginTop: 5,
						marginBottom: 5,
						fontWeight: '500',
					}}
				>
					{dateToBeHarvested(item.date_planted, plant.days_to_harvest)}
				</Text>
			</ViewAlt>
		</ViewAlt>
	) : (
		<>
			<ViewAlt style={{ flexDirection: 'row' }}>
				<ViewAlt style={{ width: '50%' }}>
					<Text style={{ fontSize: 18, fontWeight: '600' }}>
						{item.species}
					</Text>
				</ViewAlt>
				<ViewAlt style={{ width: '50%' }}>
					<Text
						style={{
							textAlign: 'right',
							alignItems: 'center',
							justifyContent: 'center',
							fontWeight: '500',
						}}
					>
						Harvest in {item.days_to_harvest} Days
					</Text>
				</ViewAlt>
			</ViewAlt>
		</>
	)
}
