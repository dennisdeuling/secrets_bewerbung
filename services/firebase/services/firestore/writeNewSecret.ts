import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { SecretData, SecretInterface } from '../../models/secret.interface';
import { database } from '../../firebase.config';
import { FirebaseConstants } from '../constants';

const writeNewSecret = async (title, background, userId, location): Promise<SecretInterface> => {
	return new Promise<SecretInterface>(async resolve => {
		const document: SecretData = {
			userId: userId,
			title: title,
			backgroundImage: background,
			timeStamp: Timestamp.fromDate(new Date()),
			location: {
				latitude: location.latitude,
				longitude: location.longitude
			},
			userData: {
				['newCreated']: {
					answer: false,
					chat: false,
					like: false
				}
			}
		};
		const docRef = await addDoc(collection(database, FirebaseConstants.firestoreSecrets), document);
		const newSecret: SecretInterface = {
			[docRef.id]: document
		};
		resolve(newSecret);
	});
};

export { writeNewSecret };
