import React from 'react'
import { Button } from 'react-native'
import { Label, SafeAreaView } from '../../components/Styles'
import { AddSeedToMyGarden } from '../../utils/Utils'

// TODO: Setup date planted option.

// TODO: Give user ability to name plant.

// TODO: Look at other options user may need to add a plant.

function Create({ route, navigation }) {
	const plantData = route.params.data

	return (
		<SafeAreaView>
			<Label>Species: {plantData.species}</Label>

			{/* Seed Button */}
			<Button
				onPress={() => {
					AddSeedToMyGarden({
						data: plantData,
						date_planted: new Date(),
						navigation,
					})

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
