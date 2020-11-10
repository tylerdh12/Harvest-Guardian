import React from 'react'
import { View } from 'react-native'
import { styles } from '../Styles/Styles'
import { Text } from './../Styles'

interface ZoneProps {
	item: any
	zone: string
}

export const Zone: React.FunctionComponent<ZoneProps> = ({ zone, item }) => {
	let key = '_' + zone.toString()
	return (
		<View>
			<Text style={styles.zoneHeading}>Zone {zone}</Text>
			<Text style={styles.zoneBody}>{item.zone[key].join(', ')}</Text>
		</View>
	)
}
