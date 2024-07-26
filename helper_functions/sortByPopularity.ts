import { SecretInterface } from '../services/firebase/models/secret.interface';

function sortByPopularity(secrets: SecretInterface[]): SecretInterface[] {
	let newSecrets = JSON.parse(JSON.stringify(secrets));

	newSecrets.sort((a, b) => {
		const keyA = Object.keys(a)[0];
		const keyB = Object.keys(b)[0];

		const secretA = a[keyA];
		const secretB = b[keyB];

		a[keyA].popularity = 0;
		b[keyB].popularity = 0;

		if (!secretA.userData) {
			const userDataKeyA = Object.keys(secretA.userData);

			a[keyA].popularity = userDataKeyA.filter(key => secretA.userData[key].like).length;
		}

		if (!secretB.userData) {
			const userDataKeyB = Object.keys(secretB.userData);

			b[keyB].popularity = userDataKeyB.filter(key => secretB.userData[key].like).length;
		}

		return a[keyA].popularity - b[keyB].popularity;
	});

	return newSecrets;
}

export { sortByPopularity };
