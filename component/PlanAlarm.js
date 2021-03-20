import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//<WheelPicker tilte={name}>

export default function PlanAlarm(props) {
	return (
		<View style={{ flex: 1 }}>
			<Text style={styles.title}>{props.title} 시간입니다.</Text>
			<TouchableOpacity style={styles.button}>
				<Text>시작</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button}>
				<Text>나중에 알리기</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.button}>
				<Text>오늘은 넘기기</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		flex: 1,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 20
	},
	button: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	}
});
