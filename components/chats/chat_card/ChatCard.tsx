import React, { FunctionComponent } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, globalStyles } from '../../../globalStyles/globalStyles';

type ChatCardProps = {
	image: string;
	onPress: () => void;
};

const ChatCard: FunctionComponent<ChatCardProps> = ({ image, onPress }): JSX.Element => {
	return (
		<Pressable
			android_ripple={{ color: Colors.androidRipple }}
			style={({ pressed }) => [
				styles.outerContainer,
				globalStyles.pressableNotPressed,
				pressed ? globalStyles.pressablePressed : null
			]}
			onPress={onPress}
		>
			<Image style={styles.image} source={{ uri: image }} />
			<View style={styles.innerContainer}>
				<Text>Name: Joe Doe</Text>
				<Text>Gender: Male</Text>
				<Text>Age: 26 - 29</Text>
				<Text>Location: Berlin</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		flexDirection: 'row',
		marginTop: 10
	},
	image: {
		height: 100,
		width: 100,
		marginRight: 10,
		borderRadius: 10
	},
	innerContainer: {
		justifyContent: 'space-around'
	}
});

export default ChatCard;
