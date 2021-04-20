import { FontAwesome5 } from '@expo/vector-icons'
import React, { useContext } from 'react'
import { Image, View } from 'react-native'
import { DetailListItem } from '../../components/DetailListItem'
import { ScrollView, TouchableOpacity, ViewAlt } from '../../components/Styles'
import { AuthContext } from '../../providers/AuthProvider'
import { styles } from './../../components/Styles/Styles'
import { BottomBorderView, Text } from './../../components/Styles'
import { StepsMaker } from '../../components/StepsMaker'

// TODO: Look to redesign details screen to be more visually appealing

export default function SeedDetails({ route, navigation }) {
	const data = route.params.data
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
				{data.zone[key].length > 0 ? (
					<DetailListItem
						label="Planting Months"
						dataText={data.zone[key].join(', ')}
					/>
				) : null}

				{data.indoorSeed.length > 0 ? (
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
								{data.indoorSeed?.map((value, index) => {
									return <StepsMaker step={value} index={index} key={index} />
								})}
							</ViewAlt>
						</ViewAlt>
					</BottomBorderView>
				) : null}
				{data.outdoorSeed.length > 0 ? (
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
								{data.outdoorSeed.map((value, index) => {
									return <StepsMaker step={value} index={index} key={index} />
								})}
							</ViewAlt>
						</ViewAlt>
					</BottomBorderView>
				) : null}
				{data.starter.length > 0 ? (
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
								{data.starter.map((value, index) => {
									return <StepsMaker step={value} index={index} key={index} />
								})}
							</ViewAlt>
						</ViewAlt>
					</BottomBorderView>
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
					<DetailListItem label="Seed Depth" dataText={data.depth + ' in'} />
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
				{data.companions.length > 0 ? (
					<DetailListItem
						label="Companion Plants"
						dataText={data.companions.join(', ')}
					/>
				) : null}
				{data.non_companions.length > 0 ? (
					<DetailListItem
						label="Anti-Companion Plants"
						dataText={data.non_companions.join(', ')}
					/>
				) : null}
			</ViewAlt>
		</ScrollView>
	)
}
