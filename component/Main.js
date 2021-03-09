import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class MainScreen extends Component {
	static navigationOptions = {
		title: 'Pomodoro'
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>MainScreen</Text>
			</View>
		);
	}
}
