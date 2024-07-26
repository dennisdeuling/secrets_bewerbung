import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { MessageInterface } from '../../../services/firebase/models/chats/message.interface';

import { Colors } from '../../../globalStyles/globalStyles';

import ImageFullScreen from '../image/ImageFullScreen';

type ChatMessageBoxProps = {
	chat: MessageInterface;
	boxAlign: string;
};

const ChatMessageBox: FunctionComponent<ChatMessageBoxProps> = ({
	chat,
	boxAlign
}): JSX.Element => {
	const image: boolean = chat.message.includes('react-native-secrets.appspot.com');
	const date: Date = chat.createdAt.toDate();

	const chatBoxStyle = image
		? null
		: boxAlign.toLowerCase() === 'right'
		? styles.chatBoxLeft
		: styles.chatBoxRight;

	return (
		<View
			style={
				boxAlign.toLowerCase() === 'right'
					? styles.chatBoxContainerLeft
					: styles.chatBoxContainerRight
			}
		>
			<View>
				<View style={{ ...chatBoxStyle }}>
					{image ? <ImageFullScreen imageUrl={chat.message} /> : <Text>{chat.message}</Text>}
				</View>
				<Text style={styles.date}>
					{new Date().toLocaleDateString('de-DE') === date.toLocaleDateString('de-DE')
						? `${date.toLocaleTimeString('de-DE')}`
						: `${date.toLocaleDateString('de-DE')} - ${date.toLocaleTimeString('de-DE')}`}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	chatBoxContainerLeft: {
		alignItems: 'flex-start',
		marginLeft: 10
	},
	chatBoxContainerRight: {
		alignItems: 'flex-end',
		marginRight: 10
	},
	chatBoxRight: {
		padding: 10,
		borderRadius: 10,
		borderBottomRightRadius: 0,
		backgroundColor: '#bfbfbf',
		width: '50%'
	},
	chatBoxLeft: {
		padding: 10,
		borderRadius: 10,
		borderBottomLeftRadius: 0,
		backgroundColor: '#bfbfbf',
		width: '50%'
	},
	image: {
		padding: 10,
		borderRadius: 20,
		width: 200,
		height: 200
	},
	date: {
		fontSize: 10,
		color: Colors.grey
	}
});

export default ChatMessageBox;
