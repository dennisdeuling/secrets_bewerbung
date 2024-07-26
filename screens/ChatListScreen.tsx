import React, { FunctionComponent, useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ChatInterface } from '../services/firebase/models/chats/chat.interface';

import { ChatContext } from '../context/chat.context';

import ChatCard from '../components/chats/chat_card/ChatCard';

import { ChatStackProps } from '../navigation/ChatStackNavigation';

type ChatListNavigationProps = NativeStackScreenProps<ChatStackProps, 'Chat List'>;

const ChatListScreen: FunctionComponent<ChatListNavigationProps> = ({
	navigation
}): JSX.Element => {
	const { allChats } = useContext(ChatContext);

	const renderChatCard = itemData => {
		const chat: ChatInterface = { ...itemData.item };
		const chatId: string = Object.keys(chat)[0];
		const { image } = Object.values(chat)[0];
		const { receiverId } = Object.values(chat)[0];

		const pressHandler = () => {
			navigation.navigate('Chat Detail', {
				chatId,
				image,
				receiverId
			});
		};

		return <ChatCard image={image} onPress={pressHandler} />;
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={allChats}
				renderItem={renderChatCard}
				keyExtractor={item => Object.keys(item)[0]}
				numColumns={1}
				initialNumToRender={12}
				maxToRenderPerBatch={10}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {}
});

export default ChatListScreen;
