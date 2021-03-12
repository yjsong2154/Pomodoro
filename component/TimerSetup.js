import React from 'react';
import { Dimensions, View, Text, Button } from 'react-native';
import WheelPicker from './WheelPicker';

const { width, height } = Dimensions.get('window');

export default class TimerSetup extends React.Component {
	state = {
		items: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
		selectedItem: 1
	};

	render() {
		console.log(height);
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<View style={{ height: 400 }}>
					<WheelPicker items={this.state.items} selected={this.state.selectedItem} />
				</View>
				<Button style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} title="Go to Details" />
			</View>
		);
	}
}
