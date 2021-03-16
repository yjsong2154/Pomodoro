import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TImerCycle({ route, navigation }) {
	const { number, work, nowork } = route.params;

	const [ round, setRound ] = useState(1);
	const [ iswork, setIswork ] = useState(1);

	const [ minutes, setMinutes ] = useState(work);
	const [ seconds, setSeconds ] = useState(0);

	useEffect(
		() => {
			const countdown = setInterval(() => {
				if (parseInt(seconds) > 0) {
					setSeconds(parseInt(seconds) - 1);
				}
				if (parseInt(seconds) === 0) {
					if (parseInt(minutes) === 0) {
						if (round === number) {
							setRound(round + 1);
							clearInterval(countdown);
						} else if (parseInt(iswork) === 1) {
							setIswork(0);
							setMinutes(nowork);
						} else {
							setRound(round + 1);
							setIswork(1);
							setMinutes(work);
						}
					} else {
						setMinutes(parseInt(minutes) - 1);
						setSeconds(59);
					}
				}
			}, 1000);
			return () => clearInterval(countdown);
		},
		[ minutes, seconds ]
	);

	return number === round - 1 ? (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={styles.end}>END!</Text>
			<View style={styles.buttonScreen}>
				<Button title="Go back" onPress={() => navigation.goBack()} />
			</View>
		</View>
	) : (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={styles.title}>
				{round} 회 (목표 : {number})
			</Text>
			<View style={styles.clockScreen}>
				<Text style={styles.clockText}>
					{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</Text>
			</View>
			<View style={styles.buttonScreen}>
				<Button title="Go back" onPress={() => navigation.goBack()} />
			</View>
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
	end: {
		flex: 4,
		textAlign: 'center',
		textAlignVertical: 'center',
		fontSize: 20
	},
	clockScreen: {
		flex: 3,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonScreen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	clockText: {
		fontSize: 30
	}
});
