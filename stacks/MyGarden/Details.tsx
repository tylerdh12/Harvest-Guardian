import moment from 'moment'
import React, { useContext } from 'react'
import { Button, Image } from 'react-native'
import { DetailListItem } from '../../components/DetailListItem'
import { StepsMaker } from '../../components/StepsMaker'
import {
	BottomBorderView,
	ScrollView,
	View,
	ViewAlt,
	Text,
} from '../../components/Styles'
import { styles } from '../../components/Styles/Styles'
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
				{plant.days_to_harvest_short ? (
					<DetailListItem
						label="Days To Harvest"
						dataText={Math.floor(
							plant.days_to_harvest_short -
								harvestProgress(data.date_planted, plant.days_to_harvest_short),
						)}
					/>
				) : null}
				{plant.zone[key].length > 0 ? (
					<DetailListItem
						label="Planting Months"
						dataText={plant.zone[key].join(', ')}
					/>
				) : null}
				{plant.indoorSeed.length > 0 ? (
					<BottomBorderView style={styles.borderBottom}>
						<ViewAlt>
							<Text style={styles.detailLabel}>Sow Indoor: </Text>
							<ViewAlt
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'center',
									paddingHorizontal: 12,
									paddingTop: 4,
								}}
							>
								{plant.indoorSeed?.map((value, index) => {
									return <StepsMaker step={value} index={index} key={index} />
								})}
							</ViewAlt>
						</ViewAlt>
					</BottomBorderView>
				) : null}
				{plant.outdoorSeed.length > 0 ? (
					<BottomBorderView style={styles.borderBottom}>
						<ViewAlt>
							<Text style={styles.detailLabel}>Sow Outdoor: </Text>
							<ViewAlt
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'center',
									paddingHorizontal: 12,
									paddingTop: 4,
								}}
							>
								{plant.outdoorSeed.map(
									(
										value: { directions: string; image: string },
										index: number,
									) => {
										return <StepsMaker step={value} index={index} key={index} />
									},
								)}
							</ViewAlt>
						</ViewAlt>
					</BottomBorderView>
				) : null}
				{plant.starter.length > 0 ? (
					<BottomBorderView style={styles.borderBottom}>
						<ViewAlt>
							<Text style={styles.detailLabel}>Starter: </Text>
							<ViewAlt
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'center',
									paddingHorizontal: 12,
									paddingTop: 4,
								}}
							>
								{plant.starter.map((value, index) => {
									return <StepsMaker step={value} index={index} key={index} />
								})}
							</ViewAlt>
						</ViewAlt>
					</BottomBorderView>
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
				{plant.companions.length > 0 ? (
					<DetailListItem
						label="Companion Plants"
						dataText={plant.companions.join(', ')}
					/>
				) : null}
				{plant.non_companions.length > 0 ? (
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
