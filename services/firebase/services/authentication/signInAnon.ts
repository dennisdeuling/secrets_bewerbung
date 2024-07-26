import { signInAnonymously } from 'firebase/auth';
import { authentication } from '../../firebase.config';

const signInAnon = async (): Promise<string> => {
	return new Promise<string>(async (resolve, reject) => {
		signInAnonymously(authentication)
			.then(() => {
				resolve('successfully signed in anonymously');
			})
			.catch(error => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				reject(errorMessage);
			});
	});
};

export { signInAnon };
