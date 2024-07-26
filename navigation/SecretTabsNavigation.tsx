import React, { FunctionComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SecretListScreen from '../screens/SecretListScreen';

type SecretTabsProps = {
	All: undefined;
	Popular: undefined;
	Location: undefined;
	Newest: undefined;
};

const SecretTabs = createMaterialTopTabNavigator<SecretTabsProps>();

const SecretTabsNavigation: FunctionComponent = (): JSX.Element => {
	return (
		<SecretTabs.Navigator
			style={styles.container}
			initialRouteName="All"
			screenOptions={{
				tabBarLabel: children => {
					return <Text>{children.children}</Text>;
				}
			}}
		>
			<SecretTabs.Screen name="All" component={SecretListScreen} />
			<SecretTabs.Screen name="Popular" component={SecretListScreen} />
			<SecretTabs.Screen name="Location" component={SecretListScreen} />
			<SecretTabs.Screen name="Newest" component={SecretListScreen} />
		</SecretTabs.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 50
	},
	navigation: {
		textTransform: 'lowercase'
	}
});

export default SecretTabsNavigation;
