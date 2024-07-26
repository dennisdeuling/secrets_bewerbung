import { Timestamp } from 'firebase/firestore';

interface SecretInterface {
	[secretId: string]: SecretData;
}

type SecretData = {
	userId: string;
	title: string;
	backgroundImage: string;
	timeStamp: Timestamp
	distance?: number;
	location: {
		latitude: number;
		longitude: number;
	};
	userData?: {
		[userId: string]: UserData;
	};
};

type UserData = {
	answer: boolean;
	chat: boolean;
	like: boolean;
};

export { UserData, SecretData, SecretInterface };
