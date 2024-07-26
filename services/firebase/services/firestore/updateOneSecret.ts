import { doc, updateDoc } from 'firebase/firestore';
import { database } from '../../firebase.config';
import { FirebaseConstants } from '../constants';

const updateOneSecret = async (
	userId: string,
	secretId: string,
	key: string,
	value: boolean
): Promise<string> => {
	return new Promise<string>(async (resolve, reject) => {
		const newData = { [`userData.${userId}.${key}`]: value };
		const docRef = doc(database, FirebaseConstants.firestoreSecrets, secretId);
		try {
			await updateDoc(docRef, newData);
		} catch (error) {
			reject(error);
		} finally {
			resolve(docRef.id);
		}
	});
};

export { updateOneSecret };
