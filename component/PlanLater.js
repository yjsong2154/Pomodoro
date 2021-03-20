import React, { useState, useCallback } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, Alert } from 'react-native';
import WheelPicker from './WheelPicker';

const { width, height } = Dimensions.get('window');
const BACK_COLOR = 'white';

export default function PlanLater(props) {
	const mins = [ 10, 20, 30, 40, 50, 60 ];
	const [ min, setMin ] = useState(30);

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.pickerScreen}>
				<WheelPicker
					style={styles.wheel}
					items={mins}
					onChange={setMin}
					selected={2}
					contentStyle={itemStyle}
					textWidth={TEXT_WIDTH}
				/>
				<Text style={styles.pickerLabel}>분 후에</Text>
			</View>
			<TouchableOpacity style={styles.button}>
				<Text>설정</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	pickerScreen: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	pickerLabel: {
		flex: 5,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 30
		// backgroundColor: 'yellow'
	},
	wheel: {
		flex: 4,
		// backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
