import React, { useState, useCallback } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, SafeAreaView, ScrollView, Alert } from 'react-native';
import WheelPicker from './WheelPicker';

const { width, height } = Dimensions.get('window');
const BACK_COLOR = 'white';

export default function PlanSetup({ navigation }) {
	const nowHourInfull = new Date().getHours();
	const nowMin = new Date().getMinutes();

	// console.log(nowHourInfull);
	console.log(nowMin);

	let nowHour = 0;
	if (nowHourInfull === 0) {
		nowHour = 12;
	} else if (nowHourInfull > 12) {
		nowHour = nowHourInfull - 12;
	} else {
		nowHour = nowHourInfull;
	}

	let minsMaker = [];
	for (let step = 0; step < 60; step++) {
		minsMaker.push(step);
	}

	const isAMs = [ '오전', '오후' ];
	const [ isAM, setIsam ] = useState('오전');
	const hours = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	const [ hour, setHour ] = useState(nowHour);
	const mins = minsMaker;
	const [ min, setMin ] = useState(nowMin);

	const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	const [ number, setNumber ] = useState(1);
	const works = [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ];
	const [ work, setWork ] = useState(25);
	const noworks = [ 3, 5, 10, 15, 20 ];
	const [ nowork, setNowork ] = useState(5);

	const TEXT_WIDTH = width * 0.4;
	const TEXT_WIDTH_DATE = width * 0.25;

	// const onPress = React.useCallback(() => {
	// 	Alert.alert(number + ' ' + work + ' ' + nowork);
	// });

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={styles.pickerScreen}>
					<WheelPicker
						style={styles.timerWheel}
						items={isAMs}
						onChange={setIsam}
						selected={2}
						contentStyle={itemStyle}
						textWidth={TEXT_WIDTH_DATE}
					/>
					<Text style={styles.dot}> </Text>
					<WheelPicker
						style={styles.timerWheel}
						items={hours}
						onChange={setHour}
						selected={2}
						contentStyle={itemStyle}
						textWidth={TEXT_WIDTH_DATE}
					/>
					<Text style={styles.dot}>:</Text>
					<WheelPicker
						style={styles.timerWheel}
						items={mins}
						onChange={setMin}
						selected={2}
						contentStyle={itemStyle}
						textWidth={TEXT_WIDTH_DATE}
					/>
				</View>
				<View style={styles.pickerScreen}>
					<Text style={styles.pickerLabel}>집중시간</Text>
					<Text style={styles.dot}>:</Text>
					<WheelPicker
						style={styles.wheel}
						items={works}
						onChange={setWork}
						selected={2}
						contentStyle={itemStyle}
						textWidth={TEXT_WIDTH}
					/>
				</View>
				<View style={styles.pickerScreen}>
					<Text style={styles.pickerLabel}>쉬는시간</Text>
					<Text style={styles.dot}>:</Text>
					<WheelPicker
						style={styles.wheel}
						items={noworks}
						onChange={setNowork}
						selected={1}
						contentStyle={itemStyle}
						textWidth={TEXT_WIDTH}
					/>
				</View>
				<View style={styles.pickerScreen}>
					<Text style={styles.pickerLabel}>횟수</Text>
					<Text style={styles.dot}>:</Text>
					<WheelPicker
						style={styles.wheel}
						items={numbers}
						onChange={setNumber}
						selected={0}
						contentStyle={itemStyle}
						textWidth={TEXT_WIDTH}
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
	timerWheel: {
		flex: 4,
		backgroundColor: 'blue',
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
	dot: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 30
	},
	wheel: {
		flex: 4,
		backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const itemStyle = {
	FONT_SIZE: 30,
	ITEM_SIZE: 40
};
