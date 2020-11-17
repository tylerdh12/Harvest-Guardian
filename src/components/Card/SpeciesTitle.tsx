import React from 'react'
import { Text } from '../Styles'
import { styles } from '../Styles/Styles'

interface Props {
	species: Text
}

const SpeciesTitle = ({ species }: Props) => {
	return <Text style={styles.cardTitle}>{species}</Text>
}

export default SpeciesTitle
