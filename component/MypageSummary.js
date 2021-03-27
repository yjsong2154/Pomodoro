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
	Alert,
	FlatList
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // @savedPlan, @listDate

const { width, height } = Dimensions.get('window');
const BACK_COLOR = 'white';
const savedPlan_Key = '@savedPlan';

export default function MypageSummary() {
	const [ savedPlan, setSavedPlan ] = useState(null);

	useFocusEffect(
		React.useCallback(() => {
			getPlanData();
		}, [])
	);

	const getPlanData = async () => {
		try {
			const value = await AsyncStorage.getItem(savedPlan_Key);
			// console.log(value);
			if (value !== null) {
				setSavedPlan(JSON.parse(value));
			}
		} catch (e) {
			Alert.alert('plan data read error', 'error code : 003');
		}
	};

	const clear = async () => {
		try {
			await AsyncStorage.removeItem(savedPlan_Key);
			setSavedPlan(null);
		} catch (e) {
			// remove error
		}
	};

	const onPressPlan = () => {};

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.item} onPress={onPressPlan}>
			<Text style={styles.title}>{item.name}</Text>
			<Text style={styles.text}>
				{'매주 '}
				{item.date[0] ? '월 ' : ''}
				{item.date[1] ? '화 ' : ''}
				{item.date[2] ? '수 ' : ''}
				{item.date[3] ? '목 ' : ''}
				{item.date[4] ? '금 ' : ''}
				{item.date[5] ? '토 ' : ''}
				{item.date[6] ? '일 ' : ''}
				{item.isAM} {item.hour} : {item.min}
			</Text>
			<Text style={styles.text}>
				{item.work}분 {item.nowork}분 {item.number}회 {item.isSound ? '소리 알람' : ''} {item.isVibration ? '진동 알람' : ''}
				{item.isVibration || item.isSound ? '' : '알람 없음'}
			</Text>
		</TouchableOpacity>
	);

	// console.log(savedPlan);

	return savedPlan === null ? (
		<Text
			style={{
				flex: 1,
				textAlign: 'center',
				textAlignVertical: 'center',
				fontSize: 20
			}}
		>
			예약된 알람이 없습니다.
		</Text>
	) : (
		<View style={{ flex: 1 }}>
			<FlatList data={savedPlan} renderItem={renderItem} />
			<Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={clear} title="clear" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
		backgroundColor: 'gray',
		marginBottom: 10
	},
	title: {
		fontSize: 20
	},
	text: {
		fontSize: 15
	}
});
