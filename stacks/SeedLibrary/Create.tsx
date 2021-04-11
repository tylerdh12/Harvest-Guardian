import React, { useState } from 'react'
import { Button } from 'react-native'
import { Label, SafeAreaView, TextInput } from '../../components/Styles'
import { AddSeedToMyGarden } from '../../utils/Utils'

// TODO: Setup date planted option.

// TODO: Give user ability to name plant.

// TODO: Look at other options user may need to add a plant.

function Create({ route, navigation }) {
	const [plantData, setPlantData] = useState(route.params.data)
	// const [variety, updateVariety] = useState('')
	// const [currentAge, updateCurrentAge] = useState('')
	// const [germinationLength, updateGerminationLength] = useState('')
	// const [growthLength, updateGrowthLength] = useState('')
	// const [isLoading, updateIsLoading] = useState('')
	// const [error, updateError] = useState('')

	return (
		<SafeAreaView>
			<Label>Species: {plantData.species}</Label>
			{/* <Label>Vairety:</Label>
			<TextInput onChangeText={text => updateVariety(text)} value={variety} />
			<Label>Current Age:</Label>
			<TextInput
				onChangeText={text => updateCurrentAge(text)}
				value={currentAge}
			/>
			<Label>Germination Length:</Label>
			<TextInput
				onChangeText={text => updateGerminationLength(text)}
				value={germinationLength}
			/>
			<Label>Growth Length:</Label>
			<TextInput
				onChangeText={text => updateGrowthLength(text)}
				value={growthLength}
			/> */}

			{/* Seed Button */}
			<Button
				onPress={() => {
					AddSeedToMyGarden({
						data: plantData,
						date_planted: new Date(),
						navigation,
					})

					console.log('Planting from Seed Pressed')
					navigation.popToTop()
				}}
				title="Plant Seed"
			/>

			{/* Starter Button */}
			<Button
				onPress={() => {
					// get base date
					var dt = new Date()

					// set date to days from started
					dt.setDate(dt.getDate() - parseInt(plantData.starter_age))

					//call AddSeedToMyGarden to add plant to users garden
					AddSeedToMyGarden({
						data: plantData,
						date_planted: dt,
						navigation,
					})
				}}
				title="Plant Starter"
			/>
		</SafeAreaView>
	)
}

export default Create
