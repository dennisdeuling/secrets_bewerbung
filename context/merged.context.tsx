import React, { createContext, FunctionComponent, ReactNode } from 'react';

import UserProvider from './user.context';
import SecretProvider from './secret.context';
import ChatProvider from './chat.context';

export const MergedContext = createContext(null);

type MergedProviderProps = {
	children: ReactNode;
};

const MergedProvider: FunctionComponent<MergedProviderProps> = ({ children }): JSX.Element => {
	return (
		<MergedContext.Provider value={null}>
			<UserProvider>
				<SecretProvider>
					<ChatProvider>{children}</ChatProvider>
				</SecretProvider>
			</UserProvider>
		</MergedContext.Provider>
	);
};

export default MergedProvider;
