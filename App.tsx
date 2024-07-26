import React from 'react';
import Constants from 'expo-constants';
import RootNavigator from './navigation/RootNavigator';
import { registerRootComponent } from 'expo';

function App(): JSX.Element {
	return <RootNavigator />;
}

// Default to rendering your app
let AppEntryPoint = App;

// Render Storybook if storybookEnabled is true
if (Constants.expoConfig.extra.storybookEnabled === 'true') {
	AppEntryPoint = require('./').default;
}

registerRootComponent(AppEntryPoint);
