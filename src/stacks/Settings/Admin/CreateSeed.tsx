import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import {
	TextInput,
	View,
	Text,
	ScrollView,
	ButtonPrimary,
	ButtonPrimaryText,
	KeyboardAvoidingView,
} from '../../../components/Styles'
import { AddSeedToLibrary } from '../../../utils/Utils'

export default function CreateSeed() {
	// For setting the Loading state of the Submit Button
	const [isLoading, setIsLoading] = useState(false)

	// The Complete list of Form Data collected as an Object
	const [formData, updateFormData] = useState({})

	// Each individual Form element State
	const [species, updateSpecies] = useState('')
	const [description, updateDescription] = useState('')
	const [sow_indoor, updateSowIndoor] = useState('')
	const [sow_outdoor, updateSowOutdoor] = useState('')
	const [days_to_harvest, updateDaysToHarvest] = useState('')
	const [days_to_germinate, updateDaysToGerminate] = useState('')
	const [starter_age, updateStarterAge] = useState('')
	const [depth, updateDepth] = useState('')
	const [spacing, updateSpacing] = useState('')
	const [height, updateHeight] = useState('')
	const [soil_temp_high, updateSoilTempHigh] = useState('')
	const [soil_temp_low, updateSoilTempLow] = useState('')
	const [sun, updateSun] = useState('')
	const [water, updateWater] = useState('')
	const [images, updateImages] = useState('')
	const [companions, updateCompanions] = useState([])
	const [non_companions, updateNonCompanions] = useState([])
	const [byproducts, updateByproducts] = useState([])
	const [nutrient, updateNutrient] = useState([])
	const [zone_1a, updateZone1a] = useState([])
	const [zone_1b, updateZone1b] = useState([])
	const [zone_2a, updateZone2a] = useState([])
	const [zone_2b, updateZone2b] = useState([])
	const [zone_3a, updateZone3a] = useState([])
	const [zone_3b, updateZone3b] = useState([])
	const [zone_4a, updateZone4a] = useState([])
	const [zone_4b, updateZone4b] = useState([])
	const [zone_5a, updateZone5a] = useState([])
	const [zone_5b, updateZone5b] = useState([])
	const [zone_6a, updateZone6a] = useState([])
	const [zone_6b, updateZone6b] = useState([])
	const [zone_7a, updateZone7a] = useState([])
	const [zone_7b, updateZone7b] = useState([])
	const [zone_8a, updateZone8a] = useState([])
	const [zone_8b, updateZone8b] = useState([])
	const [zone_9a, updateZone9a] = useState([])
	const [zone_9b, updateZone9b] = useState([])
	const [zone_10a, updateZone10a] = useState([])
	const [zone_10b, updateZone10b] = useState([])
	const [zone_11a, updateZone11a] = useState([])
	const [zone_11b, updateZone11b] = useState([])
	const [zone_12a, updateZone12a] = useState([])
	const [zone_12b, updateZone12b] = useState([])
	const [zone_13a, updateZone13a] = useState([])
	const [zone_13b, updateZone13b] = useState([])

	let dataList = {
		species,
		days_to_harvest,
		days_to_germinate,
		starter_age,
		depth,
		spacing,
		height,
		soil_temp_high,
		soil_temp_low,
		sun,
		water,
		images,
		companions,
		non_companions,
		byproducts,
		description,
		nutrient,
		sow_indoor,
		sow_outdoor,
		zone_1a,
		zone_1b,
		zone_2a,
		zone_2b,
		zone_3a,
		zone_3b,
		zone_4a,
		zone_4b,
		zone_5a,
		zone_5b,
		zone_6a,
		zone_6b,
		zone_7a,
		zone_7b,
		zone_8a,
		zone_8b,
		zone_9a,
		zone_9b,
		zone_10a,
		zone_10b,
		zone_11a,
		zone_11b,
		zone_12a,
		zone_12b,
		zone_13a,
		zone_13b,
	}

	// Used for syncing state for each input after input value change (ASYNC)
	useEffect(() => {
		;(() =>
			updateFormData({
				dataList,
			}))()
	}, [dataList])

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
		>
			<ScrollView>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>* Species:</Text>
					<TextInput
						value={species}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateSpecies(text)
						}
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Description:</Text>
					<TextInput
						value={description}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateDescription(text)
						}
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Sow Indoor:</Text>
					<TextInput
						value={sow_indoor}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateSowIndoor(text)
						}
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Sow Outdoor:</Text>
					<TextInput
						value={sow_outdoor}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateSowOutdoor(text)
						}
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Days to Germinate: (days)</Text>
					<TextInput
						value={days_to_germinate}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateDaysToGerminate(text)
						}
						keyboardType="numeric"
						returnKeyType="done"
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>* Days to Harvest: (days)</Text>
					<TextInput
						value={days_to_harvest}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateDaysToHarvest(text)
						}
						keyboardType="numeric"
						returnKeyType="done"
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Starter Age: (days)</Text>
					<TextInput
						value={starter_age}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateStarterAge(text)
						}
						keyboardType="numeric"
						returnKeyType="done"
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Depth: (cm)</Text>
					<TextInput
						value={depth}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateDepth(text)
						}
						keyboardType="numeric"
						returnKeyType="done"
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Spacing: (cm)</Text>
					<TextInput
						value={spacing}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateSpacing(text)
						}
						keyboardType="numeric"
						returnKeyType="done"
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Plant Height: (cm)</Text>
					<TextInput
						value={height}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateHeight(text)
						}
						keyboardType="numeric"
						returnKeyType="done"
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Soil Temperature High: (°C)</Text>
					<TextInput
						value={soil_temp_high}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateSoilTempHigh(text)
						}
						keyboardType="numeric"
						returnKeyType="done"
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Soil Temperature Low: (°C)</Text>
					<TextInput
						value={soil_temp_low}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateSoilTempLow(text)
						}
						keyboardType="numeric"
						returnKeyType="done"
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Sun Level:</Text>
					<TextInput
						value={sun}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateSun(text)
						}
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Water:</Text>
					<TextInput
						value={water}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateWater(text)
						}
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<Text style={{ padding: 6 }}>Image URL:</Text>
					<TextInput
						value={images}
						onChangeText={(text: React.SetStateAction<string>) =>
							updateImages(text)
						}
					/>
				</View>
				<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
					<ButtonPrimary
						style={{ marginTop: 20 }}
						onPress={() => {
							AddSeedToLibrary({ data: formData, setIsLoading })
						}}
					>
						{isLoading ? (
							<ButtonPrimaryText>Adding Seed...</ButtonPrimaryText>
						) : (
							<ButtonPrimaryText>Submit</ButtonPrimaryText>
						)}
					</ButtonPrimary>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	)
}
