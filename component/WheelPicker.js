import React from 'react';
import { StyleSheet, View, Text, Button, Dimensions, FlatList } from 'react-native';

const ICON_SIZE = 42;
const ITEM_HEIGHT = ICON_SIZE * 2;
const { width, height } = Dimensions.get('window');

function WheelPicker(props) {
	const item = props.items;
	console.log({ item });
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingTop: 200,
					paddingBottom: 200
				}}
				keyExtractor={(item) => item.toString()}
				data={item}
				renderItem={({ item }) => <Item num={item} />}
			/>
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
