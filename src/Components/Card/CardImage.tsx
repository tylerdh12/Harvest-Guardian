import React from 'react'
import { Image } from 'react-native'
import { styles } from '../Styles/Styles'

interface CardImageProps {
	image: any
}

export const CardImage: React.FunctionComponent<CardImageProps> = ({
	image,
}) => {
	return (
		<Image
			source={{
				uri: `${image}`,
			}}
			style={styles.img}
		/>
	)
}
