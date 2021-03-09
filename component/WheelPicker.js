import React from 'react';
import { View, Text, Button } from 'react-native';

function WheelPicker(items, selected) {
	state = {
		Items: [ 1, 2, 3, 4, 5, 6 ]
	};

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Button title="Go to Details" />
		</View>
	);
}

export default WheelPicker;
