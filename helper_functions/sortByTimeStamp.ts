import { SecretInterface } from '../services/firebase/models/secret.interface';

function sortByTimeStamp(secrets: SecretInterface[]): SecretInterface[] {
	let newSecrets = JSON.parse(JSON.stringify(secrets));

	newSecrets.sort((a, b) => {
		const keyA = Object.keys(a)[0];
		const keyB = Object.keys(b)[0];

		const aNewDate = new Date(a[keyA].timeStamp.seconds);
		aNewDate.setMilliseconds(a[keyA].timeStamp.nanoseconds * 1000000);

		const bNewDate = new Date(b[keyB].timeStamp.seconds);
		bNewDate.setMilliseconds(b[keyB].timeStamp.nanoseconds * 1000000);

		return aNewDate.getTime() - bNewDate.getTime();
	});

	return newSecrets;
}

export { sortByTimeStamp };
