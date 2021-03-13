import React from 'react';
import { View, Text, FlatList } from 'react-native';

function WheelPicker(props) {
	const item = props.items;
	const contentStyle = props.contentStyle;
	const FONT_SIZE = contentStyle.FONT_SIZE;
	const ITEM_SIZE = contentStyle.ITEM_SIZE;
	console.log(props.selected);

	return (
		<View style={[ props.style, { height: ITEM_SIZE * 3 } ]}>
			<FlatList
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				snapToInterval={40}
				decelerationRate="fast"
				contentContainerStyle={{
					paddingTop: ITEM_SIZE,
					paddingBottom: ITEM_SIZE
				}}
				initialScrollIndex={props.selected}
				onMomentumScrollEnd={(e) => {
					const newValue = Math.round(e.nativeEvent.contentOffset.y / ITEM_SIZE);
					if (props.onChange) {
						props.onChange(item[newValue]);
					}
				}}
				getItemLayout={(data, index) => ({ length: ITEM_SIZE, offset: ITEM_SIZE * index, index })}
				keyExtractor={(item) => item.toString()}
				data={item}
				renderItem={({ item }) => (
					<View
						style={{
							height: ITEM_SIZE,
							width: props.style.width
						}}
					>
						<Text
							style={{
								textAlign: 'center',
								textAlignVertical: 'center',
								fontSize: FONT_SIZE
							}}
						>
							{item}
						</Text>
					</View>
				)}
			/>
		</View>
	);
}

export default WheelPicker;
