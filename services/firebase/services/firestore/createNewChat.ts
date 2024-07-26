import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { database } from '../../firebase.config';
import { FirebaseConstants } from '../constants';
import { ChatData, ChatInterface } from '../../models/chats/chat.interface';

const createNewChat = async (
	senderId: string,
	receiverId: string,
	secretId: string
): Promise<ChatInterface> => {
	return new Promise(async (resolve, reject) => {
		const newChat: ChatData = {
			senderId: senderId,
			receiverId: receiverId,
			secretId: secretId,
			createdAt: Timestamp.fromDate(new Date())
		};

		const docRef = await addDoc(collection(database, FirebaseConstants.firestoreChats), newChat);

		resolve({
			[docRef.id]: newChat
		});
	});
};

export { createNewChat };
