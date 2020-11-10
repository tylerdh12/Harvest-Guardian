import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView, Text } from '../../components/Styles'

function EditPlantDetails({ route, navigation }) {
	const [data, setData] = useState(route.params.data)

	function apiCall(x: any) {
		return x
	}

	const [formState] = useState()
	const submit = useRef(() => {})

	submit.current = () => {
		// api call with new form state
		apiCall(formState)
		navigation.goBack()
	}

	useEffect(() => {
		navigation.setParams({ submit })
	}, [])

	return (
		<SafeAreaView>
			<Text style={{ fontSize: 18 }}>Edit {data.seed.species}</Text>
		</SafeAreaView>
	)
}

export default EditPlantDetails
