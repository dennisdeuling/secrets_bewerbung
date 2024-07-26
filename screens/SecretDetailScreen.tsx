import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { UserData } from '../services/firebase/models/secret.interface';
import { ChatInterface } from '../services/firebase/models/chats/chat.interface';
import { getOneChatBySecretId } from '../services/firebase/services/firestore/getOneChatBySecretId';

import { UserContext } from '../context/user.context';
import { SecretContext } from '../context/secret.context';

import SecretDetail from '../components/secrets/secret_detail/SecretDetail';

import { ChatStackProps } from '../navigation/ChatStackNavigation';
import { SecretStackProps } from '../navigation/SecretStackNavigation';
import { HomeTabProps } from '../navigation/HomeTabsNavigation';

type SecretDetailNavigationProps = CompositeScreenProps<
	NativeStackScreenProps<SecretStackProps, 'Secret Detail'>,
	CompositeScreenProps<
		BottomTabScreenProps<HomeTabProps, 'Chats'>,
		NativeStackScreenProps<ChatStackProps, 'Chat Detail'>
	>
>;

const SecretDetailScreen: FunctionComponent<SecretDetailNavigationProps> = ({
	route,
	navigation
}): JSX.Element => {
	const { userId } = useContext(UserContext);
	const { likeSecret, chatSecret } = useContext(SecretContext);
	const { secret } = route.params;
	const secretId = Object.keys(secret)[0];
	const { title, backgroundImage, userId: receiverId } = secret[secretId];
	const [userData, setUserData] = useState<UserData>();

	useMemo(() => {
		const ObjectKeys: string[] = Object.keys(secret[secretId]);
		const userDataAvailable: boolean = ObjectKeys.includes('userData');
		if (userDataAvailable) {
			const userDataId: string = Object.keys(secret[secretId].userData)[0];
			const userData: UserData = secret[secretId].userData[userDataId];
			setUserData(userData);
		} else {
			setUserData({
				answer: false,
				chat: false,
				like: false
			});
		}
	}, []);

	const changeUserData = (key: string): void => {
		switch (key) {
			case 'like':
				setUserData(prevState => ({ ...prevState, [key]: !prevState[key] }));
				break;
			case 'chat':
				setUserData(prevState => ({ ...prevState, [key]: true }));
				break;
			default:
				break;
		}
	};

	const handlePress = async (button: string): Promise<void | ChatInterface> => {
		switch (button) {
			case 'like':
				const like = !userData.like;
				changeUserData('like');
				likeSecret(secretId, like);
				break;
			case 'chat':
				const chat = !userData.chat;
				changeUserData('chat');
				if (chat) {
					const newChat: ChatInterface = await chatSecret(secretId, receiverId);
					const chatId = Object.keys(newChat)[0];

					navigation.navigate('Chats', {
						screen: 'Chat Detail',
						params: {
							chatId: chatId,
							receiverId: receiverId,
							image: backgroundImage
						}
					});
				} else {
					const getChat: ChatInterface = await getOneChatBySecretId(secretId, userId);
					console.log(getChat);
					const chatId = Object.keys(getChat)[0];
					const { receiverId } = getChat[chatId];

					navigation.navigate('Chats', {
						screen: 'Chat Detail',
						params: {
							chatId: chatId,
							receiverId: receiverId,
							image: backgroundImage
						}
					});
				}
				break;
			case 'answer':
				console.log(button);
				const answer = !userData.answer;
				changeUserData('answer');
				break;
			default:
				console.log('Something went wrong');
				break;
		}
	};

	return (
		<SafeAreaView>
			<SecretDetail
				title={title}
				backgroundImage={backgroundImage}
				userData={userData}
				onPress={handlePress}
			/>
		</SafeAreaView>
	);
};

export default SecretDetailScreen;
