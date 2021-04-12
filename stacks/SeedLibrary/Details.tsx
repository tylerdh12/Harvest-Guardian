import { FontAwesome5 } from '@expo/vector-icons'
import React, { useContext, useState } from 'react'
import { Image, View, Button } from 'react-native'
import { DetailListItem } from '../../components/DetailListItem'
import { ScrollView, TouchableOpacity, ViewAlt } from '../../components/Styles'
import { AuthContext } from '../../providers/AuthProvider'
import { deleteSeedFromLibrary } from '../../utils/Utils'
import { styles } from './../../components/Styles/Styles'

// TODO: Look to redesign details screen to be more visually appealing

export default function SeedDetails({ route, navigation }) {
	const [data, setData] = useState(route.params.data)
	const User = useContext<any>(AuthContext)

	let key = `_${User.userData.zone.toString()}`

	return (
		<ScrollView
			style={{ position: 'relative' }}
			overScrollMode="auto"
			scrollsToTop="true"
			showsVerticalScrollIndicator={false}
		>
			<TouchableOpacity
				style={styles.addPlantButton}
				onPress={() => {
					console.log('Add Seed to Library has been Clicked')
					navigation.push('Create', {
						data,
						navigation,
					})
				}}
			>
				<View style={styles.iconWrapper}>
					<FontAwesome5
						style={styles.addIcon}
						name="plus"
						size={16}
						color="#403D3D"
					/>
					<FontAwesome5
						style={styles.plantIcon}
						name="seedling"
						size={29}
						color="#403D3D"
					/>
				</View>
			</TouchableOpacity>
			<Image style={styles.headerImage} source={data.images} />
			<ViewAlt style={styles.contentWrapperContainer}>
				{data.days_to_germinate ? (
					<DetailListItem
						label="Days To Germinate"
						dataText={data.days_to_germinate + ' Days'}
					/>
				) : null}
				{data.days_to_harvest ? (
					<DetailListItem
						label="To Harvest From Seed"
						dataText={`${data.days_to_harvest} Days`}
					/>
				) : null}
				{data.starter_age ? (
					<DetailListItem
						label="To Harvest From Start"
						dataText={`${
							parseInt(data.days_to_harvest) - parseInt(data.starter_age)
						} Days`}
					/>
				) : null}
				{data.zone[key] ? (
					<DetailListItem
						label="Planting Months"
						dataText={data.zone[key].join(', ')}
					/>
				) : null}
				{data.sow_indoor !== '' ? (
					<DetailListItem label="Sowing Indoor" dataText={data.sow_indoor} />
				) : null}
				{data.sow_outdoor !== '' ? (
					<DetailListItem label="Sowing Outdoor" dataText={data.sow_outdoor} />
				) : null}
				{data.sun ? (
					<DetailListItem label="Sun Requirements" dataText={data.sun} />
				) : null}
				{data.water ? (
					<DetailListItem label="Water Requirements" dataText={data.water} />
				) : null}
				{data.soil_temp_low ? (
					<DetailListItem
						label="Soil Temperature Range"
						dataText={data.soil_temp_low + ' - ' + data.soil_temp_high}
					/>
				) : null}
				{data.depth || data.depth.$numberDecimal ? (
					<DetailListItem
						label="Seed Depth"
						dataText={
							data.depth != Number
								? data.depth.$numberDecimal < 1
									? data.depth.$numberDecimal + ' in'
									: ''
								: data.depth + ' in'
						}
					/>
				) : null}
				{data.spacing ? (
					<DetailListItem
						label="Seed Spacing"
						dataText={data.spacing + ' in'}
					/>
				) : null}
				{data.height ? (
					<DetailListItem label="Plant Height" dataText={data.height + ' in'} />
				) : null}
				{data.companions ? (
					<DetailListItem
						label="Companion Plants"
						dataText={data.companions.join(', ')}
					/>
				) : null}
				{data.non_companions ? (
					<DetailListItem
						label="Anti-Companion Plants"
						dataText={data.non_companions.join(', ')}
					/>
				) : null}
			</ViewAlt>
			<Button
				title="Delete"
				color="red"
				onPress={() => {
					deleteSeedFromLibrary({
						data,
						onRefresh: () => {
							navigation.goBack()
						},
					})
				}}
			/>
		</ScrollView>
	)
}
