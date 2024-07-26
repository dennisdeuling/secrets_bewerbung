import { StyleSheet } from 'react-native';
import { Colors } from '../../../../globalStyles/globalStyles';

export const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		justifyContent: 'center',
		width: '100%',
		height: '90%'
	},
	textInput: {
		marginTop: -70,
		marginHorizontal: 40,
		fontSize: 50,
		fontWeight: 'bold',
		color: Colors.white,
		textAlign: 'center'
	},
	text: {
		marginTop: -70,
		marginHorizontal: 40,
		fontSize: 50,
		fontWeight: 'bold',
		color: Colors.white,
		textAlign: 'center'
	}
});
