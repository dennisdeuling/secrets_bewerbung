import { Secret } from '../../services/firebase/models/secret.interface';

export type SecretDetailScreenProps = {
	route: {
		key: string;
		name: string;
		params: Secret;
		path: undefined;
	};
	navigation: {
		navigate;
	};
};
