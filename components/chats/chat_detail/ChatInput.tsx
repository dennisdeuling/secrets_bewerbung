import React, { FunctionComponent } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../../globalStyles/globalStyles';

type ChatInputProps = {
	textInput: string;
	onChange: (textInput: string) => void;
	onPressSend: () => void;
	onPressAdd: () => void;
};

const ChatInput: FunctionComponent<ChatInputProps> = ({
	onChange,
	textInput,
	onPressSend,
	onPressAdd
}): JSX.Element => {
	return (
		<View style={styles.outerContainer}>
			<View style={styles.innerContainer}>
				<Ionicons name="add" size={20} color={Colors.black} onPress={onPressAdd} />
				<TextInput
					style={styles.input}
					autoComplete={'off'}
					multiline={true}
					onChangeText={onChange}
					value={textInput}
				/>
				<Ionicons
					name="send"
					size={20}
					color={Colors.black}
					style={styles.iconSend}
					onPress={onPressSend}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	outerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10
	},
	innerContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	input: {
		width: '80%',
		padding: 5,
		borderWidth: 1,
		borderRadius: 20,
		color: Colors.black,
		backgroundColor: Colors.white
	},
	iconSend: {
		marginLeft: 10
	},
	iconAdd: {
		marginRight: 10
	}
});

export default ChatInput;
