import React, { FunctionComponent, memo } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import { UserData } from '../../../services/firebase/models/secret.interface';

import { Colors, globalStyles } from '../../../globalStyles/globalStyles';

import SecretDetailButton from './SecretDetailButton';

type SecretDetailProps = {
	title: string;
	backgroundImage: string;
	userData: UserData;
	onPress?: (button: string) => void;
};

const SecretDetail: FunctionComponent<SecretDetailProps> = ({
	title,
	backgroundImage,
	userData,
	onPress
}): JSX.Element => {
	const { like, answer, chat } = userData;

	return (
		<View style={styles.container}>
			<ImageBackground
				testID="backgroundImage"
				source={{ uri: backgroundImage }}
				resizeMode="cover"
				style={styles.image}
			>
				<Text testID="text" style={[styles.title, globalStyles.textShadow]}>
					{title}
				</Text>
			</ImageBackground>
			<View style={styles.footerContainer}>
				<SecretDetailButton
					onPress={() => onPress('like')}
					status={like}
					imageNormal="heart"
					imageOutline="heart-outline"
				/>
				<SecretDetailButton
					onPress={() => onPress('answer')}
					status={answer}
					imageNormal="arrow-redo"
					imageOutline="arrow-redo-outline"
				/>
				<SecretDetailButton
					onPress={() => onPress('chat')}
					status={chat}
					imageNormal="chatbubble"
					imageOutline="chatbubble-outline"
				/>
			</View>
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
		height: 550
	},
	title: {
		fontSize: 50,
		fontWeight: 'bold',
		color: Colors.white
	},
	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		height: 40,
		backgroundColor: Colors.androidRipple
	}
});

export default memo(SecretDetail);
