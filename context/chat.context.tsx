import React, {
	createContext,
	FunctionComponent,
	ReactNode,
	useContext,
	useLayoutEffect,
	useState
} from 'react';

import * as ImagePicker from 'expo-image-picker';

import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { getOneSecret } from '../services/firebase/services/firestore/getOneSecret';
import { createNewMessage } from '../services/firebase/services/firestore/createNewMessage';
import { uploadImage } from '../services/firebase/services/storage/uploadImage';
import { database } from '../services/firebase/firebase.config';
import { FirebaseConstants } from '../services/firebase/services/constants';

import { UserContext } from './user.context';

export const ChatContext = createContext(null);

type ChatProviderProps = {
	children: ReactNode;
};

const ChatProvider: FunctionComponent<ChatProviderProps> = ({ children }): JSX.Element => {
	const user = useContext(UserContext);
	const [allChats, setAllChats] = useState([]);

	useLayoutEffect(() => {
		if (user?.userId) {
			const { userId } = user;

			const getData = query(
				collection(database, FirebaseConstants.firestoreChats),
				where('senderId', '==', userId),
				where('receiverId', '==', userId),
				orderBy('createdAt', 'desc')
			);

			return onSnapshot(getData, collection => {
				const documents = collection.docs.map(doc => {
					return getOneSecret(doc.data().secretId).then(secret => {
						const secretId: string = Object.keys(secret)[0];
						return {
							[doc.id]: {
								senderId: doc.data().senderId,
								receiverId: doc.data().receiverId,
								secretId: doc.data().secretId,
								createdAt: doc.data().createdAt,
								image: secret[secretId].backgroundImage
							}
						};
					});
				});
				Promise.all(documents).then(docs => {
					setAllChats(docs);
				});
			});
		}
	}, [user]);

	const sendMessage = async (chatId: string, message: string): Promise<void> => {
		await createNewMessage(chatId, message, user.userId);
	};

	const pickImage = async (chatId: string, senderId: string) => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			quality: 1,
			exif: true
		});

		if (!pickerResult.canceled) {
			const imageUrl = await uploadImage(pickerResult);
			await createNewMessage(chatId, imageUrl, senderId);
		}
	};

	return (
		<ChatContext.Provider value={{ allChats, sendMessage, pickImage }}>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatProvider;
