import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	FlatList,
	Platform,
	RefreshControl,
} from 'react-native'
import { CardLayout } from '../../components/Card/CardLayout'
import Loader from '../../components/LoadingScreens/Loader'
import { SafeAreaView, View } from '../../components/Styles'

interface SeedLibraryProps {
	navigation: any
}

export const SeedLibrary: React.FC<SeedLibraryProps> = ({ navigation }) => {
	const [] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [refreshing] = useState(false)
	const [data, setData] = useState([])
	const [search, updateSearch] = useState('')

	function getSeeds() {
		axios
			.get('https://harvestguardian-rest-api.herokuapp.com/v1/seeds')
			.then(res => {
				setData(res.data)
			})
			.catch(error => alert(error))
			.finally(() => setIsLoading(false))
	}

	function onRefresh() {
		setRefreshing: true
		getSeeds()
		setRefreshing: false
	}

	useEffect(() => {
		getSeeds()
	}, [navigation])

	return (
		<SafeAreaView>
			{isLoading ? (
				Platform.OS === 'ios' ? (
					<Loader />
				) : (
					<ActivityIndicator size="large" />
				)
			) : (
				<>
					<FlatList
						style={{
							flex: 1,
							width: '100%',
						}}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
						renderItem={({ item }) => (
							<CardLayout {...{ item }} navigation={navigation} type="seed" />
						)}
						keyExtractor={(detail: any, idx) => detail + idx}
						data={data.sort((a: any, b: any) =>
							a.species.localeCompare(b.species),
						)}
					/>
				</>
			)}
		</SafeAreaView>
	)
}
