import React, {
	createContext,
	FunctionComponent,
	ReactNode,
	useContext,
	useLayoutEffect,
	useState
} from 'react';

import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../services/firebase/firebase.config';
import { ChatInterface } from '../services/firebase/models/chats/chat.interface';
import { UserInterface } from '../services/firebase/models/user.interface';
import { SecretInterface } from '../services/firebase/models/secret.interface';
import { FirebaseConstants } from '../services/firebase/services/constants';
import { updateOneSecret } from '../services/firebase/services/firestore/updateOneSecret';
import { createNewChat } from '../services/firebase/services/firestore/createNewChat';
import { writeNewSecret } from '../services/firebase/services/firestore/writeNewSecret';

import { sortByUserLocation } from '../helper_functions/sortByUserLocation';
import { sortByTimeStamp } from '../helper_functions/sortByTimeStamp';

import { UserContext } from './user.context';
import { sortByPopularity } from '../helper_functions/sortByPopularity';

export type SecretContextProps = {
	allSecrets: SecretInterface[];
	sortedByLocation: SecretInterface[];
	sortedByTimeStamp: SecretInterface[];
	sortedByPopularity: SecretInterface[];
	// secretsByUser: SecretInterface[];
	addNewSecret: (text: string, image: string) => Promise<void>;
	likeSecret: (id: string, pressed: boolean) => void;
	answerSecret: (id: string, pressed: boolean) => void;
	chatSecret: (id: string, receiverId: string) => Promise<ChatInterface>;
};

export const SecretContext = createContext<SecretContextProps | null>(null);

type SecretProviderProps = {
	children: ReactNode;
};
const SecretProvider: FunctionComponent<SecretProviderProps> = ({ children }): JSX.Element => {
	const user = useContext<UserInterface>(UserContext);
	const [allSecrets, setAllSecrets] = useState<SecretInterface[]>(null);
	const [sortedByLocation, setSortedByLocation] = useState<SecretInterface[]>(null);
	const [sortedByTimeStamp, setSortedByTimeStamp] = useState<SecretInterface[]>(null);
	const [sortedByPopularity, setSortedByPopularity] = useState<SecretInterface[]>(null);
	// const [secretsByUser, setSecretsByUser] = useState<SecretInterface[]>(null);

	useLayoutEffect(() => {
		const secrets = collection(database, FirebaseConstants.firestoreSecrets);

		return onSnapshot(secrets, collection => {
			const documents = collection.docs.map(doc => {
				return {
					[doc.id]: doc.data()
				};
			});
			// @ts-ignore
			setAllSecrets(documents);
		});
	}, []);

	useLayoutEffect(() => {
		if (allSecrets) {
			const sortedSecretsByTimeStamp = sortByTimeStamp(allSecrets);
			setSortedByTimeStamp(sortedSecretsByTimeStamp);
		}
	}, [allSecrets]);

	useLayoutEffect(() => {
		if (allSecrets) {
			const sortedSecretsByPopularity = sortByPopularity(allSecrets);
			setSortedByPopularity(sortedSecretsByPopularity);
		}
	}, [allSecrets]);

	useLayoutEffect(() => {
		if (user && allSecrets) {
			const sortedSecretsByLocation = sortByUserLocation(allSecrets, user.location);
			setSortedByLocation(sortedSecretsByLocation);
		}
	}, [user, allSecrets]);

	const addNewSecret = async (text: string, image: string): Promise<void> => {
		const { userId, location } = user;
		const { latitude, longitude } = location;
		const newLocation = {
			latitude,
			longitude
		};
		await writeNewSecret(text, image, userId, newLocation);
	};

	const likeSecret = async (secretId: string, pressed: boolean): Promise<void> => {
		await updateOneSecret(user.userId, secretId, 'like', pressed);
	};

	const chatSecret = async (secretId: string, receiverId: string): Promise<ChatInterface> => {
		return new Promise(async resolve => {
			const { userId } = user;
			await updateOneSecret(userId, secretId, 'chat', true);
			const newChat: ChatInterface = await createNewChat(userId, receiverId, secretId);
			resolve(newChat);
		});
	};

	const answerSecret = async (id: string, pressed: boolean) => {
		// console.log('Answer Secret');
		// const response = await updateOneSecret(user.userId, id, 'answer', pressed);
		// console.log(response);
		// setSecretChange(true);
	};

	return (
		<SecretContext.Provider
			value={{
				allSecrets,
				sortedByLocation,
				sortedByTimeStamp,
				sortedByPopularity,
				addNewSecret,
				likeSecret,
				answerSecret,
				chatSecret
			}}
		>
			{children}
		</SecretContext.Provider>
	);
};

export default SecretProvider;
