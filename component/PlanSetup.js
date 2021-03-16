import React, { useState, useCallback } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, SafeAreaView, ScrollView, Alert } from 'react-native';
import WheelPicker from './WheelPicker';

const { width, height } = Dimensions.get('window');
const BACK_COLOR = 'white';

export default function PlanSetup({ navigation }) {
	const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	const [ number, setNumber ] = useState(1);
	const works = [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ];
	const [ work, setWork ] = useState(25);
	const noworks = [ 3, 5, 10, 15, 20 ];
	const [ nowork, setNowork ] = useState(5);

	// const onPress = React.useCallback(() => {
	// 	Alert.alert(number + ' ' + work + ' ' + nowork);
	// });

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={styles.pickerScreen}>
					<Text style={styles.pickerLabel}>집중시간</Text>
					<Text style={styles.pickerDot}>:</Text>
					<WheelPicker style={styles.wheel} items={works} onChange={setWork} selected={2} contentStyle={itemStyle} />
				</View>
				<View style={styles.pickerScreen}>
					<Text style={styles.pickerLabel}>쉬는시간</Text>
					<Text style={styles.pickerDot}>:</Text>
					<WheelPicker
						style={styles.wheel}
						items={noworks}
						onChange={setNowork}
						selected={1}
						contentStyle={itemStyle}
					/>
				</View>
				<View style={styles.pickerScreen}>
					<Text style={styles.pickerLabel}>횟수</Text>
					<Text style={styles.pickerDot}>:</Text>
					<WheelPicker
						style={styles.wheel}
						items={numbers}
						onChange={setNumber}
						selected={0}
						contentStyle={itemStyle}
					/>
				</View>
				<View style={styles.pickerScreen}>
					<Text style={styles.pickerLabel}>횟수</Text>
					<Text style={styles.pickerDot}>:</Text>
					<WheelPicker
						style={styles.wheel}
						items={numbers}
						onChange={setNumber}
						selected={0}
						contentStyle={itemStyle}
					/>
				</View>
				<View style={styles.pickerScreen}>
					<Text style={styles.pickerLabel}>횟수</Text>
					<Text style={styles.pickerDot}>:</Text>
					<WheelPicker
						style={styles.wheel}
						items={numbers}
						onChange={setNumber}
						selected={0}
						contentStyle={itemStyle}
					/>
				</View>
				<View style={styles.buttonScreen}>
					<Button
						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
						onPress={() =>
							navigation.navigate('TimerCycle', {
								number: number,
								work: work,
								nowork: nowork
							})}
						title="START"
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	title: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 20
	},
	pickerScreen: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	buttonScreen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	pickerLabel: {
		flex: 5,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 30
		// backgroundColor: 'yellow'
	},
	pickerDot: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 30
	},
	wheel: {
		flex: 4,
		// backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const itemStyle = {
	FONT_SIZE: 30,
	ITEM_SIZE: 40
};
