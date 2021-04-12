import moment from 'moment'
import React, { useContext } from 'react'
import { Button, Image } from 'react-native'
import { DetailListItem } from '../../components/DetailListItem'
import { ScrollView, View, ViewAlt } from '../../components/Styles'
import { AuthContext } from '../../providers/AuthProvider'
import { deletePlantAlert, harvestProgress } from '../../utils/Utils'

// TODO Add dynamic value for zone
function Details({ route, navigation }) {
	const data = route.params.data
	const plant = route.params.plant

	const User = useContext<any>(AuthContext)

	let key = '_' + User.userData.zone.toString()

	return (
		<ScrollView>
			<Image style={{ width: '100%', height: 300 }} source={plant.images} />
			<ViewAlt
				style={{
					paddingTop: 25,
					borderTopRightRadius: 30,
					borderTopLeftRadius: 30,
					marginTop: -30,
				}}
			>
				<DetailListItem
					label="Date Planted"
					dataText={moment(data.date_planted).format('l')}
				/>
				{plant.days_to_germinate ? (
					<DetailListItem
						label="Days To Germinate"
						dataText={plant.days_to_germinate}
					/>
				) : null}
				{plant.days_to_harvest ? (
					<DetailListItem
						label="Days To Harvest"
						dataText={Math.floor(
							plant.days_to_harvest -
								harvestProgress(data.date_planted, plant.days_to_harvest),
						)}
					/>
				) : null}
				{plant.zone[key] ? (
					<DetailListItem
						label="Planting Months"
						dataText={plant.zone[key].join(', ')}
					/>
				) : null}
				{plant.sow_indoor !== '' ? (
					<DetailListItem label="Sowing Indoor" dataText={plant.sow_indoor} />
				) : null}
				{plant.sow_outdoor !== '' ? (
					<DetailListItem label="Sowing Outdoor" dataText={plant.sow_outdoor} />
				) : null}
				{plant.sun ? (
					<DetailListItem label="Sun Requirements" dataText={plant.sun} />
				) : null}
				{plant.water ? (
					<DetailListItem label="Water Requirements" dataText={plant.water} />
				) : null}
				{plant.soil_temp_low || plant.soil_temp_high ? (
					<DetailListItem
						label="Soil Temperature Range"
						dataText={
							plant.soil_temp_high + ' - ' + plant.soil_temp_low + ' °F'
						}
					/>
				) : null}
				{plant.depth ? (
					<DetailListItem label="Seed Depth" dataText={plant.depth + ' in'} />
				) : null}
				{plant.spacing ? (
					<DetailListItem
						label="Seed Spacing"
						dataText={plant.spacing + ' in'}
					/>
				) : null}
				{plant.height ? (
					<DetailListItem
						label="Plant Height"
						dataText={plant.height + ' in'}
					/>
				) : null}
				{plant.companions ? (
					<DetailListItem
						label="Companion Plants"
						dataText={plant.companions.join(', ')}
					/>
				) : null}
				{plant.non_companions ? (
					<DetailListItem
						label="Anti-Companion Plants"
						dataText={plant.non_companions.join(', ')}
					/>
				) : null}
				<View
					style={{
						justifyContent: 'space-evenly',
						alignItems: 'center',
						flexDirection: 'row',
						padding: 15,
					}}
				>
					<Button
						title="Delete"
						color="red"
						onPress={() => {
							deletePlantAlert({
								data,
								onRefresh: () => {
									navigation.goBack()
								},
							})
						}}
					/>
				</View>
			</ViewAlt>
		</ScrollView>
	)
}

export default Details
