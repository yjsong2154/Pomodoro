import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerSetup from './component/TimerSetup';
import TimerCycle from './component/TimerCycle';
import PlanSetup from './component/PlanSetup';
import MyPage from './component/MyPage';

const TimerStack = createStackNavigator();

function Timer() {
	return (
		<TimerStack.Navigator initialRouteName="Home">
			<TimerStack.Screen name="Pomodoro" component={TimerSetup} />
			<TimerStack.Screen name="TimerCycle" component={TimerCycle} options={{ headerShown: false }} />
		</TimerStack.Navigator>
	);
}

const SchStack = createStackNavigator();

function Schedule() {
	return (
		<SchStack.Navigator>
			<SchStack.Screen name="Schedule" component={PlanSetup} />
		</SchStack.Navigator>
	);
}

const MypageStack = createStackNavigator();

function Mypage() {
	return (
		<MypageStack.Navigator>
			<MypageStack.Screen name="MyPage" component={MyPage} />
			{/* <MypageStack.Screen name="Details" component={DetailsScreen} /> */}
		</MypageStack.Navigator>
	);
}

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Timer" component={Timer} />
				<Tab.Screen name="Schedule" component={Schedule} />
				<Tab.Screen name="MyPage" component={Mypage} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

//error code up to : 004
