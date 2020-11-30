import moment from 'moment'
import React, { useContext, useState } from 'react'
import { Button, Image } from 'react-native'
import { DetailListItem } from '../../components/DetailListItem'
import { ScrollView, View, ViewAlt } from '../../components/Styles'
import { AuthContext } from '../../providers/AuthProvider'
import { deletePlantAlert, harvestProgress } from '../../utils/Utils'

// TODO Add dynamic value for zone
function Details({ route, navigation }) {
	const [data, setData] = useState(route.params.data)
	const User = useContext<any>(AuthContext)

	let key = '_' + User.userData.zone.toString()

	return (
		<ScrollView>
			<Image
				style={{ width: '100%', height: 300 }}
				source={{
					uri: `${data.seed.images}`,
				}}
			/>
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
				{data.seed.days_to_germinate ? (
					<DetailListItem
						label="Days To Germinate"
						dataText={data.seed.days_to_germinate}
					/>
				) : null}
				{data.seed.days_to_harvest ? (
					<DetailListItem
						label="Days To Harvest"
						dataText={Math.floor(
							data.seed.days_to_harvest -
								harvestProgress(data.date_planted, data.seed.days_to_harvest),
						)}
					/>
				) : null}
				{data.seed.zone[key] ? (
					<DetailListItem
						label="Planting Months"
						dataText={data.seed.zone[key].join(', ')}
					/>
				) : null}
				{data.seed.sow_indoor !== '' ? (
					<DetailListItem
						label="Sowing Indoor"
						dataText={data.seed.sow_indoor}
					/>
				) : null}
				{data.seed.sow_outdoor !== '' ? (
					<DetailListItem
						label="Sowing Outdoor"
						dataText={data.seed.sow_outdoor}
					/>
				) : null}
				{data.seed.sun ? (
					<DetailListItem label="Sun Requirements" dataText={data.seed.sun} />
				) : null}
				{data.seed.water ? (
					<DetailListItem
						label="Water Requirements"
						dataText={data.seed.water}
					/>
				) : null}
				{data.seed.soil_temp_low || data.seed.soil_temp_high ? (
					<DetailListItem
						label="Soil Temperature Range"
						dataText={
							data.seed.soil_temp_high + ' - ' + data.seed.soil_temp_low + ' °F'
						}
					/>
				) : null}
				{data.seed.depth ? (
					<DetailListItem
						label="Seed Depth"
						dataText={data.seed.depth + ' in'}
					/>
				) : null}
				{data.seed.spacing ? (
					<DetailListItem
						label="Seed Spacing"
						dataText={data.seed.spacing + ' in'}
					/>
				) : null}
				{data.seed.height ? (
					<DetailListItem
						label="Plant Height"
						dataText={data.seed.height + ' in'}
					/>
				) : null}
				{data.seed.companions ? (
					<DetailListItem
						label="Companion Plants"
						dataText={data.seed.companions.join(', ')}
					/>
				) : null}
				{data.seed.non_companions ? (
					<DetailListItem
						label="Anti-Companion Plants"
						dataText={data.seed.non_companions.join(', ')}
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
						title="Edit"
						onPress={() => {
							navigation.navigate('EditPlantDetails', {
								data: data,
							})
						}}
					/>
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
