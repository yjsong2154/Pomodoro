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
			console.log(value);
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

	const Item = ({ title }) => (
		<View style={styles.item}>
			<Text style={styles.title}>{title}</Text>
		</View>
	);

	const renderItem = ({ item }) => <Item title={item.name} />;

	return savedPlan === null ? (
		<Text
			style={{
				flex: 1,
				textAlign: 'center',
				textAlignVertical: 'center',
				fontSize: 20
			}}
		>
			null
		</Text>
	) : (
		<View style={{ flex: 1 }}>
			<FlatList data={savedPlan} renderItem={renderItem} />
			<Text>{savedPlan.length}</Text>
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
		marginHorizontal: 16
	},
	title: {
		fontSize: 32
	}
});
