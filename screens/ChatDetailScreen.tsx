import React, { FunctionComponent, useContext, useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { database } from '../services/firebase/firebase.config';

import { MessageType } from '../services/firebase/services/firestore/createNewMessage';
import { MessageInterface } from '../services/firebase/models/chats/message.interface';
import { FirebaseConstants } from '../services/firebase/services/constants';

import { UserContext } from '../context/user.context';
import { ChatContext } from '../context/chat.context';

import ChatInput from '../components/chats/chat_detail/ChatInput';
import ChatMessageBox from '../components/chats/chat_detail/ChatMessageBox';

import { ChatStackProps } from '../navigation/ChatStackNavigation';

type ChatDetailNavigationProps = NativeStackScreenProps<ChatStackProps, 'Chat Detail'>;

const ChatDetailScreen: FunctionComponent<ChatDetailNavigationProps> = ({ route }): JSX.Element => {
	const { userId } = useContext(UserContext);
	const { sendMessage, pickImage } = useContext(ChatContext);
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [textInput, setTextInput] = useState('');
	const { image, chatId, receiverId } = route.params;

	console.log(route.params);

	useLayoutEffect(() => {
		const docRef = query(
			collection(database, FirebaseConstants.firestoreChats, chatId, 'messages'),
			orderBy('createdAt', 'asc')
		);
		return onSnapshot(docRef, collection => {
			setMessages(
				collection.docs.map(doc => {
					return {
						[doc.id]: {
							senderId: doc.data().senderId,
							message: doc.data().message,
							createdAt: doc.data().createdAt,
							read: doc.data().read
						}
					};
				})
			);
		});
	}, []);

	const handleTextInput = (textInput: string): void => {
		setTextInput(textInput);
	};

	const handleSendMessage = (): void => {
		sendMessage(chatId, textInput);
		setTextInput('');
	};

	const handlePickImage = (): void => {
		console.log('Press add');
		pickImage(chatId, userId);
	};

	// FIXME: has to be fixed
	const renderChatMessageBox = messageData => {
		const messageKey: string = Object.keys(messageData.item)[0];
		const chat: MessageInterface = messageData.item[messageKey];

		const boxAlign: string = chat.senderId === userId ? 'Left' : 'Right';

		return <ChatMessageBox chat={chat} boxAlign={boxAlign} />;
	};

	return (
		<View style={styles.container}>
			<View style={styles.outerContainer}>
				<Image style={styles.image} source={{ uri: image }} />
				<View style={styles.innerContainer}>
					<Text>Name: Joe Doe</Text>
					<Text>Gender: Male</Text>
					<Text>Age: 26 - 29</Text>
					<Text>Location: Berlin</Text>
				</View>
			</View>
			{/*TODO: Refactor the code*/}
			{messages && (
				<AutoScrollFlatList
					data={messages}
					renderItem={renderChatMessageBox}
					keyExtractor={message => Object.keys(message)[0]}
				/>
			)}
			<ChatInput
				onChange={handleTextInput}
				textInput={textInput}
				onPressSend={handleSendMessage}
				onPressAdd={handlePickImage}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	outerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		borderStyle: 'solid',
		borderBottomWidth: 2
	},
	innerContainer: {
		justifyContent: 'space-around'
	},
	image: {
		height: 100,
		width: 100,
		margin: 10,
		borderRadius: 10
	},
	scrollView: {
		marginTop: 10,
		marginBottom: 10
	}
});

export default ChatDetailScreen;
