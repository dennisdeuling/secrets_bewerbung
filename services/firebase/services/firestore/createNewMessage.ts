import { database } from '../../firebase.config';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { FirebaseConstants } from '../constants';

export type MessageType = {
	[chatId: string]: {
		message: string;
		senderId: string;
		createdAt?: { seconds: number; nanoseconds: number };
	};
};

const createNewMessage = async (
	chatId: string,
	message: string,
	senderId: string
): Promise<MessageType> => {
	return new Promise(async (resolve, reject) => {
		const newMessage = {
			senderId: senderId,
			message: message,
			createdAt: Timestamp.fromDate(new Date()),
			read: false
		};
		const docRef = await addDoc(
			collection(database, FirebaseConstants.firestoreChats, chatId, 'messages'),
			newMessage
		);
		const resolvedMessage = { [docRef.id]: newMessage };
		resolve(resolvedMessage);
	});
};

export { createNewMessage };
