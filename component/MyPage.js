import React, { useState, useCallback, useEffect } from 'react';
import {
	Dimensions,
	View,
	Text,
	StyleSheet,
	Button,
	SafeAreaView,
	ScrollView,
	TextInput,
	Switch,
	TouchableOpacity,
	Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MypageSummary from './MypageSummary';

const { width, height } = Dimensions.get('window');
const BACK_COLOR = 'white';

export default function Mypage() {
	return <MypageSummary />;
}
