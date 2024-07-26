import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatListScreen from '../screens/ChatListScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';

export type ChatStackProps = {
	'Chat List': undefined;
	'Chat Detail': {
		chatId: string;
		receiverId: string;
		image: string;
	};
};

const ChatStack = createNativeStackNavigator<ChatStackProps>();

const ChatStackNavigation: FunctionComponent = (): JSX.Element => {
	return (
		<ChatStack.Navigator
			screenOptions={{
				headerShown: true
			}}
		>
			<ChatStack.Screen name="Chat List" component={ChatListScreen} />
			<ChatStack.Screen name="Chat Detail" component={ChatDetailScreen} />
		</ChatStack.Navigator>
	);
};

export default ChatStackNavigation;
