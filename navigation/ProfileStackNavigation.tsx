import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/ProfileScreen';

export type ProfileStackProps = {
	'Profile Screen';
};

const ProfileStack = createNativeStackNavigator<ProfileStackProps>();

const ProfileStackNavigation: FunctionComponent = (): JSX.Element => {
	return (
		<ProfileStack.Navigator
			screenOptions={{
				headerShown: true
			}}
		>
			<ProfileStack.Screen name="Profile Screen" component={ProfileScreen} />
		</ProfileStack.Navigator>
	);
};

export default ProfileStackNavigation;
