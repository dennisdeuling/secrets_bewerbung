import React, { FunctionComponent } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, globalStyles } from '../../../globalStyles/globalStyles';

type HeaderButtonProps = {
	title: string;
	onPress: (title: string) => void;
};

const HeaderButton: FunctionComponent<HeaderButtonProps> = ({ title, onPress }): JSX.Element => {
	const handlePress = (title: string) => {
		onPress(title);
	};

	return (
		<Pressable
			accessibilityRole="button"
			android_ripple={{ color: Colors.androidRipple }}
			style={({ pressed }) => [
				globalStyles.pressableNotPressed,
				pressed ? globalStyles.pressablePressed : null,
				styles.button
			]}
			onPress={() => handlePress(title)}
		>
			<Text style={styles.title}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 295,
		marginRight: 40,
		backgroundColor: Colors.black,
		borderRadius: 15
	},
	title: {
		// paddingHorizontal: 5,
		paddingVertical: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.white
	}
});

export default HeaderButton;
