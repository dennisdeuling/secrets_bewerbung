import { doc, getDoc } from 'firebase/firestore';
import { database } from '../../firebase.config';
import { FirebaseConstants } from '../constants';

const getOneSecret = async (docId: string): Promise<unknown> => {
	return new Promise(async resolve => {
		const docRef = doc(database, FirebaseConstants.firestoreSecrets, docId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			resolve({
				[docSnap.id]: docSnap.data()
			});
		} else {
		}
	});
};

export { getOneSecret };
