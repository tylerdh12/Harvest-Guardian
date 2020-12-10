import React, { useState } from 'react'
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from '../Styles'

export const ZoneForm = () => {
	const [zone_1a, updateZone1a] = useState(false)

	return (
		<View style={{ alignItems: 'center', width: '100%', marginTop: 4 }}>
			<Text style={{ padding: 6 }}>Zone 1a:</Text>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Jan</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Feb</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Mar</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Apr</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>May</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Jun</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Jul</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Aug</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Sep</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Oct</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Nov</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text style={{ padding: 6 }}>Dec</Text>
					<TouchableOpacity
						style={[
							zone_1a === true
								? { borderColor: '#3cc' }
								: { borderColor: 'red' },
							{ width: 18, height: 18, borderWidth: 1 },
						]}
						onPress={() => updateZone1a(zone_1a => !zone_1a)}
					/>
				</View>
			</View>
		</View>
	)
}
