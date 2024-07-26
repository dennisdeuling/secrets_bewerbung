import React, { FunctionComponent } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SecretInterface } from '../services/firebase/models/secret.interface';

import SecretDetailScreen from '../screens/SecretDetailScreen';

import SecretTabsNavigation from './SecretTabsNavigation';

export type SecretStackProps = {
	'Secret List': undefined;
	'Secret Detail': { secret: SecretInterface };
};

const SecretStack = createNativeStackNavigator<SecretStackProps>();

const SecretStackNavigation: FunctionComponent = (): JSX.Element => {
	return (
		<SecretStack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<SecretStack.Screen name="Secret List" component={SecretTabsNavigation} />
			<SecretStack.Screen
				options={{
					presentation: 'card',
					headerShown: true,
					headerBackTitle: 'back',
					headerTitle: 'Details'
				}}
				name="Secret Detail"
				component={SecretDetailScreen}
			/>
		</SecretStack.Navigator>
	);
};

export default SecretStackNavigation;
