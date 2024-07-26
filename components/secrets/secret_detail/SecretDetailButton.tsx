import React, { FunctionComponent } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, globalStyles } from '../../../globalStyles/globalStyles';

type SecretDetailButtonProps = {
	status: boolean;
	imageOutline: keyof typeof Ionicons.glyphMap;
	imageNormal: keyof typeof Ionicons.glyphMap;
	onPress?: () => void;
};

const SecretDetailButton: FunctionComponent<SecretDetailButtonProps> = ({
	status,
	imageNormal,
	imageOutline,
	onPress
}): JSX.Element => {
	return (
		<Pressable
			testID="detail-button"
			android_ripple={{ color: Colors.androidRipple }}
			style={({ pressed }) => [
				globalStyles.pressableNotPressed,
				pressed ? globalStyles.pressablePressed : null,
				styles.button
			]}
			onPress={onPress}
		>
			<Ionicons name={status ? imageNormal : imageOutline} size={35} color={Colors.black} />
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
		alignItems: 'center'
	}
});

export default SecretDetailButton;
