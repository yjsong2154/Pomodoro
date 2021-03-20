import React from 'react';
import { View, Text, FlatList } from 'react-native';

{
	/* <WheelPicker style={styles.wheel} items={works} onChange={setWork} selected={2} contentStyle={itemStyle} textWidth={TEXT_WIDTH}/> */
}

function WheelPicker(props) {
	const item = props.items;
	const contentStyle = props.contentStyle;
	const FONT_SIZE = contentStyle.FONT_SIZE;
	const ITEM_SIZE = contentStyle.ITEM_SIZE;
	const TEXT_WIDTH = props.textWidth;

	// console.log({ props });
	// console.log(props.selected);

	return (
		<View style={[ props.style, { height: ITEM_SIZE * 3 } ]}>
			<FlatList
				nestedScrollEnabled={true}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}
				snapToInterval={40}
				decelerationRate="fast"
				bounces={false}
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
							width: TEXT_WIDTH
							// backgroundColor: 'gray'
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
