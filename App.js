import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TimerSetup from './component/TimerSetup';

const Stack = createStackNavigator();

export default function App() {
	return <TimerSetup />;
}
