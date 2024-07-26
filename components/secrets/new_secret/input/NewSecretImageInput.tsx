import React, { FunctionComponent, useEffect } from 'react';
import { ImageBackground, Text, View } from 'react-native';

import { globalStyles } from '../../../../globalStyles/globalStyles';
import { styles } from './styles';

type NewSecretImageInputProps = {
	text: string;
	backgroundImage: string;
	pickImage: () => Promise<void>;
};
const NewSecretImageInput: FunctionComponent<NewSecretImageInputProps> = ({
	text,
	backgroundImage,
	pickImage
}): JSX.Element => {
	useEffect((): void => {
		pickImage().then(r => console.log(r));
	}, []);

	return (
		<View style={styles.container}>
			<ImageBackground source={{ uri: backgroundImage }} style={styles.image}>
				<Text style={[styles.text, globalStyles.textShadow]}>{text}</Text>
			</ImageBackground>
		</View>
	);
};

export default NewSecretImageInput;
