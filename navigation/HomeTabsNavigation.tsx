import React, { FunctionComponent } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SecretStackNavigation, { SecretStackProps } from './SecretStackNavigation';
import ChatStackNavigation, { ChatStackProps } from './ChatStackNavigation';
import ProfileStackNavigation from './ProfileStackNavigation';

const CreateNewPlaceholder: FunctionComponent = (): JSX.Element => {
	return <View style={{ flex: 1, backgroundColor: 'blue' }}></View>;
};

export type HomeTabProps = {
	Secrets: NavigatorScreenParams<SecretStackProps>;
	'Add Secret';
	Chats: NavigatorScreenParams<ChatStackProps>;
	Profile;
};

const HomeTabs = createBottomTabNavigator<HomeTabProps>();

const HomeTabsNavigation: FunctionComponent = (): JSX.Element => {
	return (
		<HomeTabs.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<HomeTabs.Screen
				options={{
					tabBarIcon: () => <Ionicons name="home" size={25} color="#8E8E8F" />
				}}
				name="Secrets"
				component={SecretStackNavigation}
			/>
			<HomeTabs.Screen
				options={{
					tabBarIcon: () => <Ionicons name="add-circle" size={25} color="#8E8E8F" />
				}}
				name="Add Secret"
				component={CreateNewPlaceholder}
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault();
						navigation.navigate('NewSecret');
					}
				})}
			/>
			<HomeTabs.Screen
				options={{
					tabBarIcon: () => <Ionicons name="chatbubbles" size={25} color="#8E8E8F" />
				}}
				name="Chats"
				component={ChatStackNavigation}
			/>
			<HomeTabs.Screen
				options={{
					tabBarIcon: () => <Ionicons name="people" size={25} color="#8E8E8F" />
				}}
				name="Profile"
				component={ProfileStackNavigation}
			/>
		</HomeTabs.Navigator>
	);
};

export default HomeTabsNavigation;
