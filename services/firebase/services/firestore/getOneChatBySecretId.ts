import { collection, getDocs, query, where } from 'firebase/firestore';
import { FirebaseConstants } from '../constants';
import { database } from '../../firebase.config';
import { ChatInterface } from '../../models/chats/chat.interface';

const getOneChatBySecretId = async (secretId: string, userId: string): Promise<ChatInterface> => {
	return new Promise(async (resolve, reject) => {
		const docRef = query(
			collection(database, FirebaseConstants.firestoreChats),
			where('secretId', '==', secretId)
		);

		const docSnap = await getDocs(docRef);

		let chat = {};

		docSnap.forEach(doc => {
			const { senderId } = doc.data();
			if (senderId === userId) {
				chat = {
					[doc.id]: doc.data()
				};
			}
		});

		resolve(chat);
	});
};

export { getOneChatBySecretId };
