import React, {
	createContext,
	FunctionComponent,
	ReactNode,
	useLayoutEffect,
	useState
} from 'react';

import { UserInterface } from '../services/firebase/models/user.interface';
import { getUserData } from '../services/firebase/services/authentication/getUserData';

export const UserContext = createContext<UserInterface | null>(null);

type UserProviderProps = {
	children: ReactNode;
};

const UserProvider: FunctionComponent<UserProviderProps> = ({ children }): JSX.Element => {
	const [user, setUser] = useState<UserInterface>(null);

	useLayoutEffect(() => {
		(async () => {
			const user: UserInterface = await getUserData();

			setUser(user);
			console.log(user.userId);
		})();
	}, []);

	// console.log('UserContext');

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
