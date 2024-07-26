import { FunctionComponent, useContext, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { uploadImage } from '../services/firebase/services/storage/uploadImage';
import { SecretContext } from '../context/secret.context';

import HeaderButton from '../components/ui/buttons/HeaderButton';
import NewSecretTextInput from '../components/secrets/new_secret/input/NewSecretTextInput';
import NewSecretImageInput from '../components/secrets/new_secret/input/NewSecretImageInput';

import { RootStackProps } from '../navigation/RootNavigator';

const defaultImage =
	'http://localhost:9199/v0/b/react-native-secrets.appspot.com/o/images%2FIMG_3241.jpeg?alt=media&token=ddfaaf26-1f0d-4ab7-8ee4-e9a6ed9a984b';

type ButtonText = 'Next' | 'Post';

export type NewSecretNavigationProps = NativeStackScreenProps<RootStackProps, 'NewSecret'>;

const NewSecretScreen: FunctionComponent<NewSecretNavigationProps> = ({
	navigation
}): JSX.Element => {
	const { addNewSecret } = useContext(SecretContext);
	const [text, setText] = useState<string | null>(null);
	const [image, setImage] = useState<string>(defaultImage);
	const [buttonTextPressed, setButtonTextPressed] = useState<ButtonText>('Next');
	const [buttonPressed, setButtonPressed] = useState<boolean>(false);

	useEffect(() => {
		const headerTitle = { headerTitle: ({ children }): JSX.Element => <Text>{children}</Text> };
		navigation.setOptions({
			...headerTitle
		});

		if (text) {
			navigation.setOptions({
				...headerTitle,
				headerRight: () => <HeaderButton title="Next" onPress={handleButtonPressed} />
			});
		}
		if (text && buttonPressed) {
			navigation.setOptions({
				...headerTitle,
				headerRight: () => <HeaderButton title="Post" onPress={handleButtonPressed} />
			});
		}

		if (buttonTextPressed.toLowerCase().includes('post')) {
			addNewSecret(text, image);
			//  FIXME: fix the redirection
			navigation.navigate('Secret List');
		}
	}, [navigation, text, image, buttonTextPressed]);

	const handleButtonPressed = (title: ButtonText): void => {
		setButtonTextPressed(title);
		setButtonPressed(prevState => !prevState);
	};

	const handleTextInput = (text: string): void => {
		setText(text);
	};

	const pickImage = async (): Promise<void> => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 1
		});

		if (!pickerResult.canceled) {
			const imageUrl = await uploadImage(pickerResult);

			setImage(imageUrl);
		}
	};

	return (
		<View style={styles.container}>
			{!buttonPressed && (
				<NewSecretTextInput text={text} backgroundImage={image} onChange={handleTextInput} />
			)}
			{text && buttonPressed && (
				<NewSecretImageInput text={text} backgroundImage={image} pickImage={pickImage} />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default NewSecretScreen;
