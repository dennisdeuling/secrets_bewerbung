import React, { FunctionComponent } from 'react';
import { ImageBackground, TextInput, View } from 'react-native';

import { globalStyles } from '../../../../globalStyles/globalStyles';
import { styles } from './styles';

type NewSecretTextInputProps = {
	text: string;
	backgroundImage: string;
	onChange: (text: string) => void;
};

const NewSecretTextInput: FunctionComponent<NewSecretTextInputProps> = ({
	text,
	backgroundImage,
	onChange
}): JSX.Element => {
	const onChangeText = (text: string): void => {
		onChange(text);
	};

	return (
		<View style={styles.container}>
			<ImageBackground source={{ uri: backgroundImage }} style={styles.image}>
				<TextInput
					style={[styles.textInput, globalStyles.textShadow]}
					multiline
					maxLength={100}
					autoFocus={true}
					onChangeText={onChangeText}
					value={text}
				/>
			</ImageBackground>
		</View>
	);
};

export default NewSecretTextInput;
