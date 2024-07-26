import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { UserContext } from '../context/user.context';

import HeaderButton from '../components/ui/buttons/HeaderButton';

import { ProfileStackProps } from '../navigation/ProfileStackNavigation';

export type ProfileNavigationProps = NativeStackScreenProps<ProfileStackProps, 'Profile Screen'>;

const ProfileScreen: FunctionComponent<ProfileNavigationProps> = ({ navigation }): JSX.Element => {
	const user = useContext(UserContext);
	const { city } = user.location;
	const [text, setChangeText] = useState<string | null>(null);
	const [profileData, setProfileData] = useState<{ gender: string; age: string }>({
		gender: '',
		age: ''
	});
	const gender = ['male', 'female', 'trans', 'non binary', 'other'];
	const age = ['15 - 18', '19 - 25', '26 - 30', '31 - 35', '36 - 40', '41 - 45', '45+'];

	useEffect(() => {
		const headerTitle = { headerTitle: ({ children }): JSX.Element => <Text>{children}</Text> };
		navigation.setOptions({
			...headerTitle,
			headerRight: () => <HeaderButton title="Save" onPress={handleButtonPressed} />
		});
	}, []);

	const handleButtonPressed = () => {};

	const handleChangeText = (text: string): void => {
		console.log(text);
	};

	const handleOnPress = item => {
		const regEx = new RegExp(`^${item.includes('+') ? item.replace('+', '\\+') : item}$`);

		if (gender.some(item => regEx.test(item))) {
			setProfileData(prevState => {
				return { ...prevState, gender: item };
			});
		}

		if (age.some(item => regEx.test(item))) {
			setProfileData(prevState => {
				return { ...prevState, age: item };
			});
		}
	};

	const renderButtons = (item: string[]): JSX.Element[] => {
		return item.map((item, index) => {
			const regEx = new RegExp(`^${item.includes('+') ? item.replace('+', '\\+') : item}$`);

			let style = {};

			if (gender.some(item => regEx.test(item))) {
				style = profileData['gender'].match(regEx) ? [styles.button, styles.active] : styles.button;
			}

			if (age.some(item => regEx.test(item))) {
				style = profileData['age'].match(regEx) ? [styles.button, styles.active] : styles.button;
			}

			return (
				<TouchableOpacity key={index} style={style} onPress={() => handleOnPress(item)}>
					<Text>{item}</Text>
				</TouchableOpacity>
			);
		});
	};

	console.log(profileData);

	return (
		<View>
			<View style={styles.container}>
				<Text>Nickname:</Text>
				<TextInput style={styles.input} onChangeText={handleChangeText} value={text} />
			</View>
			<View style={styles.container}>
				<Text>I am:</Text>
				<View style={styles.buttonContainer}>{renderButtons(gender)}</View>
			</View>
			<View style={styles.container}>
				<Text>My age:</Text>
				<View style={styles.buttonContainer}>{renderButtons(age)}</View>
			</View>
			<View style={styles.container}>
				<Text>My location:</Text>
				<View style={styles.buttonContainer}>
					<Text style={styles.button}>{city}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},
	input: {
		height: 50,
		width: '50%',
		borderStyle: 'solid',
		borderWidth: 2
	},
	button: {
		paddingVertical: 5,
		paddingHorizontal: 15,
		marginHorizontal: 20,
		marginBottom: 10,
		borderStyle: 'solid',
		borderWidth: 2,
		borderRadius: 20
	},
	active: {
		backgroundColor: 'blue'
	}
});

export default ProfileScreen;
