import React from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';

function WheelPicker(props) {
	const item = props.items;
	console.log({ item });
	return (
		<View>
			<Text>{props.items}</Text>
			<FlatList keyExtractor={(item) => item.toString()} data={item} renderItem={({ item }) => <Item num={item} />} />
		</View>
	);
}

const Item = ({ num }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{num}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 40
	},
	text: {
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 30
	}
});

export default WheelPicker;
