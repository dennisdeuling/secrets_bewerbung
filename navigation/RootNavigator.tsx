import React, { FunctionComponent } from 'react';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MergedProvider from '../context/merged.context';

import NewSecretScreen from '../screens/NewSecretScreen';

import HomeTabsNavigation, { HomeTabProps } from './HomeTabsNavigation';

export type RootStackProps = {
	HomeStack: NavigatorScreenParams<HomeTabProps>;
	NewSecret;
};

const RootStack = createNativeStackNavigator<RootStackProps>();

const RootNavigator: FunctionComponent = (): JSX.Element => {
	return (
		<MergedProvider>
			<NavigationContainer>
				<RootStack.Navigator
					screenOptions={{
						headerShown: false
					}}
				>
					<RootStack.Screen name="HomeStack" component={HomeTabsNavigation} />
					<RootStack.Screen
						options={{
							presentation: 'modal',
							headerShown: true
						}}
						name="NewSecret"
						component={NewSecretScreen}
					/>
				</RootStack.Navigator>
			</NavigationContainer>
		</MergedProvider>
	);
};

export default RootNavigator;
