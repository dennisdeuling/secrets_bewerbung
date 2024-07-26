import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { database } from '../../firebase.config';
import { FirebaseConstants } from '../constants';
import { UserInterface } from '../../models/user.interface';

const createNewUser = async (user: UserInterface): Promise<unknown> => {
	return new Promise(async (resolve, reject) => {
		const newUser: UserInterface = user;
		// newUser.createdAt = Timestamp.fromDate(new Date());

		const docRef = await addDoc(collection(database, FirebaseConstants.firestoreUsers), newUser);

		resolve({
			[docRef.id]: newUser
		});
	});
};

export { createNewUser };
