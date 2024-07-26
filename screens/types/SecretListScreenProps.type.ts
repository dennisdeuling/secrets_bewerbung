import { Secret } from '../../services/firebase/models/secret.interface';

export type SecretListScreenProps = {
	navigation: {
		addListener: () => void;
		canGoBack: () => void;
		dispatch: () => void;
		getId: () => void;
		getParent: () => void;
		getState: () => void;
		goBack: () => void;
		isFocused: () => void;
		jumpTo: () => void;
		navigate: (detail: string, secret: Secret) => void;
		pop: () => void;
		popToTop: () => void;
		push: () => void;
		removeListener: () => void;
		replace: () => void;
		reset: () => void;
		setOptions: () => void;
		setParams: () => void;
	};
};
