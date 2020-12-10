import React, { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Platform,
	RefreshControl,
} from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { CardLayout } from '../../components/Card/CardLayout'
import Loader from '../../components/LoadingScreens/Loader'
import { SafeAreaView, Text, View, ViewAlt } from '../../components/Styles'
import { getPlants } from '../../utils/Utils'

const { width } = Dimensions.get('window')
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
		<SafeAreaView>
			{isLoading ? (
				Platform.OS === 'ios' ? (
					<Loader />
				) : (
					<ActivityIndicator size="large" />
				)
			) : (
				<FlatList
					style={{ marginTop: 8 }}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					renderItem={({ item, index }) => (
						<View style={{ margin: 8 }}>
							<CardLayout {...{ item }} navigation={navigation} type="plant" />
						</View>
					)}
					keyExtractor={(plant: any, idx) => plant + idx}
					data={data}
					ListEmptyComponent={() => {
						return (
							<ViewAlt
								style={{
									width: 350,
									alignItems: 'center',
									borderRadius: 15,
									marginTop: 25,
								}}
							>
								<TouchableNativeFeedback
									onPress={() => {
										navigation.navigate('Seed Library')
									}}
								>
									<Text
										style={{ fontSize: 22, fontWeight: '700', padding: 25 }}
									>
										+ Add a new Seed
									</Text>
								</TouchableNativeFeedback>
							</ViewAlt>
						)
					}}
				/>
			)}
		</SafeAreaView>
	)
}
