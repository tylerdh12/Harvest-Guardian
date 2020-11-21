import axios from 'axios'
import React from 'react'
import { Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'

interface UtilsProps {
	setData?: any
	setLoading?: any
	setRefreshing?: any
	data?: any
	navigation?: any
}

export const Utils: React.FC<UtilsProps> = ({}) => {
	return null
}

export async function getPlants(setData, setLoading) {
	await SecureStore.getItemAsync('authBasic').then(authBasic => {
		axios({
			method: 'get',
			url: 'https://harvestguardian-rest-api.herokuapp.com/v1/plants',
			headers: {
				Authorization: authBasic,
			},
		})
			.then(res => {
				if (res.status === 401) {
					console.log('Response 401')
					console.log(res)
				} else {
					setData(res.data)
				}
			})
			.then(() => setLoading(false))
	})
}

export async function addPlantAlert({ data, navigation }) {
	// const [date, setDate] = useState("");
	Alert.alert(
		'Is this a seed or starter',
		`A start adds the plant past the germination stage.`,
		[
			{
				text: 'Planting a Seed',
				onPress: () => {
					AddSeedToMyGarden({
						data,
						date_planted: new Date(),
						navigation,
					})

					console.log('Seed Pressed')
				},
			},
			{
				text: 'Planting a Starter',
				onPress: () => {
					console.log('Starter Pressed')
					var dt = new Date()
					dt.setDate(dt.getDate() - parseInt(data.starter_age))
					console.log(dt)
					AddSeedToMyGarden({
						data,
						date_planted: dt,
						navigation,
					})

					console.log('Starter Pressed')
				},
			},
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
		],
		{ cancelable: true },
	)

	// return (
	//   <View>
	//     <TextInput
	//       style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
	//       onChangeText={(text) => setDate(text)}
	//       value={date}
	//     />
	//   </View>
	// );
}

export const AddSeedToMyGarden = async ({ date_planted, data, navigation }) => {
	await SecureStore.getItemAsync('authBasic').then(authBasic => {
		axios({
			method: 'post',
			url: 'https://harvestguardian-rest-api.herokuapp.com/v1/plants',
			headers: {
				Authorization: authBasic,
			},
			data: {
				_id: data._id,
				date_planted: date_planted,
			},
		}).then(res => {
			if (res.status === 401) {
				console.log('Response 401')
				console.log(res)
			} else {
				navigation.navigate('MyGarden', {
					setRefresh: true,
				})
			}
		})
	})
}

export async function deletePlantAlert({ data, onRefresh }) {
	Alert.alert(
		'Are you sure?',
		`Would you still like to remove ${data.seed.species} ${data.seed.variety} from My Garden`,
		[
			{
				text: 'Yes - Remove Please',
				onPress: async () =>
					deletePlantFromMyGarden({
						data,
						onRefresh,
					}),
			},
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
		],
		{ cancelable: false },
	)
}

export async function deletePlantFromMyGarden({ data, onRefresh }) {
	await SecureStore.getItemAsync('authBasic').then(authBasic => {
		axios({
			method: 'delete',
			url: `https://harvestguardian-rest-api.herokuapp.com/v1/plants/${data._id}`,
			headers: {
				Authorization: authBasic,
			},
		}).then(res => {
			if (res.status === 401) {
				console.log('Response 401')
				console.log(res)
			} else if (res.status === 200) {
				res.data.deletedCount === 1
					? onRefresh()
					: alert('Error Deleting Plant')
			}
		})
	})
}

export const AddSeedToLibrary = async ({ data, setIsLoading }) => {
	setIsLoading(true)
	// console.log(data)
	await axios({
		method: 'post',
		url: 'https://harvestguardian-rest-api.herokuapp.com/v1/seeds/',
		data: {
			species: data.species,
			description: data.description,
			sow_indoor: data.sow_indoor,
			sow_outdoor: data.sow_outdoor,
			days_to_germinate: parseInt(data.days_to_germinate),
			days_to_harvest: parseInt(data.days_to_harvest),
			starter_age: parseInt(data.starter_age),
			depth: parseInt(data.depth),
			spacing: parseInt(data.spacing),
			height: parseInt(data.height),
			soil_temp_low: parseInt(data.soil_temp_low),
			soil_temp_high: parseInt(data.soil_temp_high),
			sun: data.sun,
			water: data.water,
			images: data.images,
			companions: data.companions,
			non_companions: data.non_companions,
			byproducts: data.byproducts,
			nutrient: data.nutrient,
			public: false,
			complete: false,
			zone: {
				_1a: data.zone_1a,
				_1b: data.zone_1b,
				_2a: data.zone_2a,
				_2b: data.zone_2b,
				_3a: data.zone_3a,
				_3b: data.zone_3b,
				_4a: data.zone_4a,
				_4b: data.zone_4b,
				_5a: data.zone_5a,
				_5b: data.zone_5b,
				_6a: data.zone_6a,
				_6b: data.zone_6b,
				_7a: data.zone_7a,
				_7b: data.zone_7b,
				_8a: data.zone_8a,
				_8b: data.zone_8b,
				_9a: data.zone_9a,
				_9b: data.zone_9b,
				_10a: data.zone_10a,
				_10b: data.zone_10b,
				_11a: data.zone_11a,
				_11b: data.zone_11b,
				_12a: data.zone_12a,
				_12b: data.zone_12b,
				_13a: data.zone_13a,
				_13b: data.zone_13b,
			},
		},
	}).then(res => {
		if (res.status === 401) {
			setIsLoading(false)
			console.log('Response 401')
			console.log(res)
		} else if (res.status === 500) {
			setIsLoading(false)
			console.log('Response ')
			console.log(res)
		} else if (res.status === 201) {
			setIsLoading(false)
			alert('Seed has been added to Seed Library')
		} else {
			setIsLoading(false)
			console.log(
				'There has been an error with submitting a seed to the Library',
			)
		}
	})
	setIsLoading(false)
}

export async function deleteSeedFromLibrary({ data, onRefresh }) {
	await SecureStore.getItemAsync('authBasic').then(authBasic => {
		axios({
			method: 'delete',
			url: `https://harvestguardian-rest-api.herokuapp.com/v1/seeds/${data._id}`,
		}).then(res => {
			if (res.status === 401) {
				console.log('Response 401')
				console.log(res)
			} else if (res.status === 200) {
				res.data.deletedCount === 1 ? onRefresh() : alert('Error Deleting Seed')
			}
		})
	})
}

// Validate Password

export const ValidatePassword = (password, validPassword, setValidPassword) => {
	password.length >= 8 ? setValidPassword(true) : setValidPassword(false)
}

// Conversion Utility Functions

export const fahrenheitToCelsius = temp => {
	return ((temp - 32) * 5) / 9
}

export const celsiusToFahrenheit = temp => {
	return (temp / 5) * 9 - 32
}

export const imperialToMetric = inches => {
	return inches * 2.54
}

export const metricToImperial = centimeters => {
	return centimeters / 2.54
}
