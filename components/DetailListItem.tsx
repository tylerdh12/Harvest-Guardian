import React from 'react'
import { BottomBorderView, Text } from './Styles'
import { styles } from './Styles/Styles'

export const DetailListItem = (_props: any) => {
	return (
		<BottomBorderView style={styles.borderBottom}>
			<Text style={styles.detailLabel}>{_props.label}: </Text>
			<Text style={styles.dataDetails}>{_props.dataText}</Text>
		</BottomBorderView>
	)
}
