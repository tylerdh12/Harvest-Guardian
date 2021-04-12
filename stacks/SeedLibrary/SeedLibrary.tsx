// import axios from 'axios'
import React from 'react'
import { FlatList } from 'react-native'
import { CardLayout } from '../../components/Card/CardLayout'
import { SafeAreaView } from '../../components/Styles'
import { Plants } from './../../data/plants.js'

interface SeedLibraryProps {
	navigation: any
}

export const SeedLibrary: React.FC<SeedLibraryProps> = ({ navigation }) => {
	return (
		<SafeAreaView>
			<>
				<FlatList
					style={{
						flex: 1,
						width: '100%',
					}}
					renderItem={({ item }) => (
						<CardLayout {...{ item }} navigation={navigation} type="seed" />
					)}
					keyExtractor={(detail: any, idx) => detail + idx}
					data={Plants.sort((a: any, b: any) =>
						a.species.localeCompare(b.species),
					)}
				/>
			</>
		</SafeAreaView>
	)
}
