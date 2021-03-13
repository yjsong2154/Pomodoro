import React, { useState, useCallback } from 'react';
import { Dimensions, View, Text, StyleSheet, Button, Alert } from 'react-native';
import WheelPicker from './WheelPicker';

const { width, height } = Dimensions.get('window');
const BACK_COLOR = 'white';

export default function TimerSetup() {
	const numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	const [ number, setNumber ] = useState(1);
	const works = [ 15, 20, 25, 30, 35, 40, 45, 50, 55, 60 ];
	const [ work, setWork ] = useState(25);
	const noworks = [ 3, 5, 10, 15, 20 ];
	const [ nowork, setNowork ] = useState(5);

	const onPress = React.useCallback(() => {
		Alert.alert(number + ' ' + work + ' ' + nowork);
	});

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>pomodoro</Text>
			<WheelPicker style={styles.wheel} items={numbers} onChange={setNumber} selected={0} contentStyle={itemStyle} />
			<WheelPicker style={styles.wheel} items={works} onChange={setWork} selected={2} contentStyle={itemStyle} />
			<WheelPicker style={styles.wheel} items={noworks} onChange={setNowork} selected={1} contentStyle={itemStyle} />
			<Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={onPress} title="START" />
		</View>
	);
}

const styles = StyleSheet.create({
	wheel: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 300
	}
});

const itemStyle = {
	FONT_SIZE: 30,
	ITEM_SIZE: 40
};
