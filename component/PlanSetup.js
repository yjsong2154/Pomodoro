import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
	Dimensions,
	View,
	Text,
	StyleSheet,
	Button,
	SafeAreaView,
	ScrollView,
	TextInput,
	Switch,
	TouchableOpacity,
	Alert
} from 'react-native';
import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import WheelPicker from './WheelPicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @savedPlan, @listDate

const { width, height } = Dimensions.get('window');
const BACK_COLOR = 'white';
const numSavedPlan_Key = '@savedPlan';
let minsMaker = [];
for (let step = 0; step < 60; step++) {
	minsMaker.push(step);
}

export default function PlanSetup({ navigation }) {
	//scroll to top
	const ref = useRef(null);
	useScrollToTop(ref);
	//scroll to top end

	const nowHourInfull = new Date().getHours();
	const nowMin = new Date().getMinutes();

	const [ name, setName ] = useState(null);
	const isAMs = [ 'AM', 'PM' ];
	const [ isAM, setIsam ] = useState(nowAm);
	const hours = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	const [ hour, setHour ] = useState(nowHour);
	const mins = minsMaker;
	const [ min, setMin ] = useState(nowMin);

	const [ date, setDate ] = useState([ false, false, false, false, false, false, false ]);
	const onPressMon = () => setDate((date) => [ !date[0], date[1], date[2], date[3], date[4], date[5], date[6] ]);
	const onPressTue = () => setDate((date) => [ date[0], !date[1], date[2], date[3], date[4], date[5], date[6] ]);
	const onPressWed = () => setDate((date) => [ date[0], date[1], !date[2], date[3], date[4], date[5], date[6] ]);
	const onPressThu = () => setDate((date) => [ date[0], date[1], date[2], !date[3], date[4], date[5], date[6] ]);
	const onPressFri = () => setDate((date) => [ date[0], date[1], date[2], date[3], !date[4], date[5], date[6] ]);
	const onPressSat = () => setDate((date) => [ date[0], date[1], date[2], date[3], date[4], !date[5], date[6] ]);
	const onPressSun = () => setDate((date) => [ date[0], date[1], date[2], date[3], date[4], date[5], !date[6] ]);

	const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	const [ number, setNumber ] = useState(1);
	const works = [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ];
	const [ work, setWork ] = useState(25);
	const noworks = [ 3, 5, 10, 15, 20 ];
	const [ nowork, setNowork ] = useState(5);

	const [ isSound, setisSound ] = useState(false);
	const toggleSwitchSound = () => setisSound((previousState) => !previousState);
	const [ isVibration, setisVibration ] = useState(false);
	const toggleSwitchVib = () => setisVibration((previousState) => !previousState);

	const TEXT_WIDTH = width * 0.4;
	const TEXT_WIDTH_DATE = width * 0.25;

	useFocusEffect(
		React.useCallback(() => {
			getPlanData();
		}, [])
	);

	let nowAm = 'AM';
	let nowHour = 0;
	if (nowHourInfull === 0 || nowHourInfull === 24) {
		nowHour = 12;
	} else if (nowHourInfull === 12) {
		nowHour = 12;
		nowAm = 'PM';
	} else if (nowHourInfull > 12) {
		nowHour = nowHourInfull - 12;
		nowAm = 'PM';
	} else {
		nowHour = nowHourInfull;
	}

	const [ prePlan, setPrePlan ] = useState(null);
	const getPlanData = async () => {
		try {
			const value = await AsyncStorage.getItem(numSavedPlan_Key);
			console.log(value);
			if (value !== null) {
				setPrePlan(JSON.parse(value));
			} else {
				setPrePlan(null);
			}
		} catch (e) {
			Alert.alert('plan data read error', 'error code : 001');
		}
	};

	const storePlanData = async () => {
		try {
			const rename = name === null ? '오늘의 뽀모도로' : name;
			let value = null;
			if (prePlan === null) {
				value = [
					{
						name: rename,
						isAM: isAM,
						hour: hour,
						min: min,
						date: date,
						number: number,
						work: work,
						nowork: nowork,
						isSound: isSound,
						isVibration: isVibration
					}
				];
			} else {
				value = [
					{
						name: rename,
						isAM: isAM,
						hour: hour,
						min: min,
						date: date,
						number: number,
						work: work,
						nowork: nowork,
						isSound: isSound,
						isVibration: isVibration
					},
					...prePlan
				];
			}
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(numSavedPlan_Key, jsonValue);
		} catch (e) {
			Alert.alert('plan data store error', 'error code : 002');
		}
		navigation.navigate('MyPage');
	};

	// const onPress = React.useCallback(() => {
	// 	Alert.alert(number + ' ' + work + ' ' + nowork);
	// });
	// console.log(nowHourInfull);
	// console.log(nowMin);
	// console.log(date);

	return (
		<SafeAreaView>
			<ScrollView nestedScrollEnabled={true} ref={ref}>
				<TextInput
					style={styles.nameInput}
					onChangeText={(name) => setName(name)}
					value={name}
					placeholder="프로젝트 제목"
					keyboardType="default"
				/>
				<View style={styles.pickerScreen}>
					<WheelPicker
						style={styles.timerWheel}
						items={isAMs}
						onChange={setIsam}
						selected={nowAm === 'AM' ? 0 : 1}
						contentStyle={itemStyle}
						textWidth={TEXT_WIDTH_DATE}
					/>
					<Text style={styles.dot}> </Text>
					<WheelPicker
						style={styles.timerWheel}
						items={hours}
						onChange={setHour}
						selected={nowHour - 1}
						contentStyle={itemStyle}
						textWidth={TEXT_WIDTH_DATE}
					/>
					<Text style={styles.dot}>:</Text>
					<WheelPicker
						style={styles.timerWheel}
						items={mins}
						onChange={setMin}
						selected={nowMin}
						contentStyle={itemStyle}
						textWidth={TEXT_WIDTH_DATE}
					/>
				</View>
				<View style={styles.dayScreen}>
					<TouchableOpacity style={date[0] ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressMon}>
						<Text>월</Text>
					</TouchableOpacity>
					<TouchableOpacity style={date[1] ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressTue}>
						<Text>화</Text>
					</TouchableOpacity>
					<TouchableOpacity style={date[2] ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressWed}>
						<Text>수</Text>
					</TouchableOpacity>
					<TouchableOpacity style={date[3] ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressThu}>
						<Text>목</Text>
					</TouchableOpacity>
					<TouchableOpacity style={date[4] ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressFri}>
						<Text>금</Text>
					</TouchableOpacity>
					<TouchableOpacity style={date[5] ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressSat}>
						<Text>토</Text>
					</TouchableOpacity>
					<TouchableOpacity style={date[6] ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressSun}>
						<Text>일</Text>
					</TouchableOpacity>
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
				<View style={styles.toggleScreen}>
					<Text style={styles.toggleLabel}>알람음</Text>
					<View style={styles.toggleButton}>
						<Switch
							trackColor={{ false: '#767577', true: '#81b0ff' }}
							thumbColor={isSound ? '#f5dd4b' : '#f4f3f4'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitchSound}
							value={isSound}
						/>
					</View>
				</View>

				<View style={styles.toggleScreen}>
					<Text style={styles.toggleLabel}>진동</Text>
					<View style={styles.toggleButton}>
						<Switch
							trackColor={{ false: '#767577', true: '#81b0ff' }}
							thumbColor={isVibration ? '#f5dd4b' : '#f4f3f4'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitchVib}
							value={isVibration}
						/>
					</View>
				</View>

				<View style={styles.buttonScreen}>
					<Button
						style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
						onPress={storePlanData}
						title="저장하기"
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
	nameInput: {
		flex: 1,
		textAlign: 'left',
		textAlignVertical: 'center',
		fontSize: 30
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
	dayScreen: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	timerWheel: {
		flex: 4,
		// backgroundColor: 'blue',
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
	toggleScreen: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	toggleLabel: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 30
	},
	toggleButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	dayButtonOn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 30,
		backgroundColor: 'gray'
	},
	dayButtonOff: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 30
	},
	dot: {
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
