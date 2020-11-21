import { Picker } from '@react-native-community/picker'
import React from 'react'
import { Label, View } from '../../components/Styles'

interface Props {}

export const GrowingZoneSelector = ({ zone, setZone }) => {
	return (
		<View style={{ width: '70%', alignItems: 'center', height: 250 }}>
			<Label>Growing Zone</Label>
			<Picker
				itemStyle={{ color: 'white' }}
				selectedValue={zone}
				style={{ height: 30, width: 100 }}
				onValueChange={(itemValue, itemIndex) => setZone(itemValue)}
			>
				<Picker.Item label="1a" value="1a" />
				<Picker.Item label="1b" value="1b" />
				<Picker.Item label="2a" value="2a" />
				<Picker.Item label="2b" value="2b" />
				<Picker.Item label="3a" value="3a" />
				<Picker.Item label="3b" value="3b" />
				<Picker.Item label="4a" value="4a" />
				<Picker.Item label="4b" value="4b" />
				<Picker.Item label="5a" value="5a" />
				<Picker.Item label="5b" value="5b" />
				<Picker.Item label="6a" value="6a" />
				<Picker.Item label="6b" value="6b" />
				<Picker.Item label="7a" value="7a" />
				<Picker.Item label="7b" value="7b" />
				<Picker.Item label="8a" value="8a" />
				<Picker.Item label="8b" value="8b" />
				<Picker.Item label="9a" value="9a" />
				<Picker.Item label="9b" value="9b" />
				<Picker.Item label="10a" value="10a" />
				<Picker.Item label="10b" value="10b" />
				<Picker.Item label="11a" value="11a" />
				<Picker.Item label="11b" value="11b" />
				<Picker.Item label="12a" value="12a" />
				<Picker.Item label="12b" value="12b" />
				<Picker.Item label="13a" value="13a" />
				<Picker.Item label="13b" value="13b" />
			</Picker>
		</View>
	)
}
