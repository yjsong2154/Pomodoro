import React from 'react';
import { View, Text, Button } from 'react-native';
import WheelPicker from './WheelPicker';

export default class TimerSetup extends React.Component {
	state = {
		items: [ 1, 2, 3, 4, 5, 6 ],
		selectedItem: 1
	};

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Home Screen</Text>
				<Button title="Go to Details" />
				<WheelPicker items={this.state.items} selected={this.state.selectedItem} />
			</View>
		);
	}
}
