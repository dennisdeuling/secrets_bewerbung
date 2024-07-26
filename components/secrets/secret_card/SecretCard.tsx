import React, { FunctionComponent } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import { SecretInterface } from '../../../services/firebase/models/secret.interface';

import { Colors, globalStyles } from '../../../globalStyles/globalStyles';

type SecretCardProps = {
	secret?: SecretInterface;
	onPress?: (secret) => void;
};

const SecretCard: FunctionComponent<SecretCardProps> = ({ secret, onPress }): JSX.Element => {
	const secretId = Object.keys(secret)[0];
	const { title, backgroundImage } = secret[secretId];

	return (
		<View style={styles.container} key={secretId}>
			<Pressable
				android_ripple={{ color: Colors.androidRipple }}
				style={({ pressed }) => [
					globalStyles.pressableNotPressed,
					pressed ? globalStyles.pressablePressed : null
				]}
				onPress={onPress}
			>
				<ImageBackground
					accessibilityRole="image"
					source={{ uri: backgroundImage }}
					resizeMode="cover"
					style={styles.image}
				>
					<Text style={[styles.title, globalStyles.textShadow]}>{title}</Text>
				</ImageBackground>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 200
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: Colors.white
	}
});

export default SecretCard;
