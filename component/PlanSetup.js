import React, { useState, useCallback, useEffect } from 'react';
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
import WheelPicker from './WheelPicker';

const { width, height } = Dimensions.get('window');
const BACK_COLOR = 'white';

export default function PlanSetup({ navigation }) {
	// useEffect(() => {
	const nowHourInfull = new Date().getHours();
	const nowMin = new Date().getMinutes();

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

	let minsMaker = [];
	for (let step = 0; step < 60; step++) {
		minsMaker.push(step);
	}
	// }, []); // 업데이트를 한번만 할수는 없을까? , []); 가 들어가면 mount에서 한번

	const [ name, setName ] = useState('오늘의 뽀모도로');
	const isAMs = [ 'AM', 'PM' ];
	const [ isAM, setIsam ] = useState(nowAm);
	const hours = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
	const [ hour, setHour ] = useState(nowHour);
	const mins = minsMaker;
	const [ min, setMin ] = useState(nowMin);

	const [ isMon, setMon ] = useState(false);
	const onPressMon = () => setMon((previousState) => !previousState);
	const [ isTue, setTue ] = useState(false);
	const onPressTue = () => setTue((previousState) => !previousState);
	const [ isWed, setWed ] = useState(false);
	const onPressWed = () => setWed((previousState) => !previousState);
	const [ isThu, setThu ] = useState(false);
	const onPressThu = () => setThu((previousState) => !previousState);
	const [ isFri, setFri ] = useState(false);
	const onPressFri = () => setFri((previousState) => !previousState);
	const [ isSat, setSat ] = useState(false);
	const onPressSat = () => setSat((previousState) => !previousState);
	const [ isSun, setSun ] = useState(false);
	const onPressSun = () => setSun((previousState) => !previousState);

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

	// const onPress = React.useCallback(() => {
	// 	Alert.alert(number + ' ' + work + ' ' + nowork);
	// });
	// console.log(nowHourInfull);
	// console.log(nowMin);
	// console.log(name);

	return (
		<SafeAreaView>
			<ScrollView>
				<TextInput
					style={styles.nameInput}
					onChangeText={(text) => setName(text)}
					value={number}
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
					<TouchableOpacity style={isMon ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressMon}>
						<Text>월</Text>
					</TouchableOpacity>
					<TouchableOpacity style={isTue ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressTue}>
						<Text>화</Text>
					</TouchableOpacity>
					<TouchableOpacity style={isWed ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressWed}>
						<Text>수</Text>
					</TouchableOpacity>
					<TouchableOpacity style={isThu ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressThu}>
						<Text>목</Text>
					</TouchableOpacity>
					<TouchableOpacity style={isFri ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressFri}>
						<Text>금</Text>
					</TouchableOpacity>
					<TouchableOpacity style={isSat ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressSat}>
						<Text>토</Text>
					</TouchableOpacity>
					<TouchableOpacity style={isSun ? styles.dayButtonOn : styles.dayButtonOff} onPress={onPressSun}>
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
						onPress={() =>
							navigation.navigate('TimerCycle', {
								number: number,
								work: work,
								nowork: nowork
							})}
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
