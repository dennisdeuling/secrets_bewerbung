import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../../firebase.config';

const getUserId = async (): Promise<object> => {
	return new Promise<object>(async (resolve, reject) => {
		function callback(user) {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				resolve(user.uid);
			} else {
				reject('User is not available');
			}
		}

		await onAuthStateChanged(authentication, callback);
	});
};

export { getUserId };
