import React, { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Platform,
	RefreshControl,
	StyleSheet,
} from 'react-native'
import { TouchableOpacity } from 'react-native'
import { CardLayout } from '../../components/Card/CardLayout'
import Loader from '../../components/LoadingScreens/Loader'
import { SafeAreaView, Text, View, ViewAlt } from '../../components/Styles'
import { getPlants } from '../../utils/Utils'

const { width, height } = Dimensions.get('window')
interface MyGardenProps {
	navigation: any
}

export const MyGarden: React.FC<MyGardenProps> = ({ navigation }) => {
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState([])
	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		navigation.addListener('focus', () => {
			setRefreshing(true)
			setLoading(true)
			getPlants(setData, setLoading)
			setRefreshing(false)
			setLoading(false)
		})
	}, [navigation])

	function onRefresh() {
		setRefreshing(true)
		getPlants(setData, setLoading)
		setRefreshing(false)
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{isLoading ? (
				Platform.OS === 'ios' ? (
					<Loader />
				) : (
					<ActivityIndicator size="large" />
				)
			) : (
				<FlatList
					style={{
						flex: 1,
						width: '100%',
					}}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					renderItem={({ item }) => (
						<CardLayout {...{ item }} navigation={navigation} type="plant" />
					)}
					keyExtractor={(plant: any, idx) => plant + idx}
					data={data}
					ListEmptyComponent={() => {
						return (
							<View style={[styles.fullSize, { width: width, height: height }]}>
								<ViewAlt
									style={{
										width: 350,
										borderRadius: 15,
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<TouchableOpacity
										onPress={() => {
											navigation.navigate('Seed Library')
										}}
									>
										<Text
											style={{
												fontSize: 22,
												fontWeight: '700',
												padding: 25,
												alignItems: 'center',
											}}
										>
											+ Add a new Seed
										</Text>
									</TouchableOpacity>
								</ViewAlt>
							</View>
						)
					}}
				/>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	fullSize: {
		alignItems: 'center',
		justifyContent: 'center',
	},
})
