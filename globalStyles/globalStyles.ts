import { StyleSheet } from 'react-native';

export const Colors: {
	androidRipple: string;
	white: string;
	black: string;
	grey: string;
} = {
	androidRipple: '#ccc',
	white: 'white',
	black: 'black',
	grey: '#808080'
};

export const globalStyles: {
	textShadow: {
		textShadowColor: string;
		textShadowOffset: {
			width: number;
			height: number;
		};
		textShadowRadius: number;
	};
	pressableNotPressed: { flex: number };
	pressablePressed: { opacity: number };
} = StyleSheet.create({
	textShadow: {
		textShadowColor: Colors.black,
		textShadowOffset: {
			width: -3,
			height: 3
		},
		textShadowRadius: 2
	},
	pressableNotPressed: {
		flex: 1
	},
	pressablePressed: {
		opacity: 0.5
	}
});
