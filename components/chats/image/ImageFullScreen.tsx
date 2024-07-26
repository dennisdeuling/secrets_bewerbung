import React, { FunctionComponent, useLayoutEffect, useState } from 'react';
import { Dimensions, Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../../globalStyles/globalStyles';

const screenWidth = Dimensions.get('screen').width;

type ImageFullScreenProps = {
	imageUrl: string;
};

const ImageFullScreen: FunctionComponent<ImageFullScreenProps> = ({ imageUrl }): JSX.Element => {
	const [openImage, setOpenImage] = useState(false);
	const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

	const handleOpenImage = () => {
		setOpenImage(prevState => !prevState);
	};

	useLayoutEffect(() => {
		Image.getSize(imageUrl, (width, height) => {
			let percentage: number = 0;

			if (height > width) {
				if (height >= 1400) {
					percentage = 30;
				}
				if (height > 1400) {
					percentage = 35;
				}
				if (height <= 3000) {
					percentage = 25;
				}
			}

			if (height < width) {
				if (width > screenWidth) {
					percentage = 45;
				}
			}

			width = (width / 100) * percentage;
			height = (height / 100) * percentage;

			setImageDimensions({ width, height });
		});
	}, []);

	return (
		<View>
			<Pressable onPress={handleOpenImage}>
				<Image style={styles.imageThumb} resizeMode={'cover'} source={{ uri: imageUrl }} />
			</Pressable>
			<Modal
				animationType="fade"
				transparent={true}
				visible={openImage}
				// onRequestClose={() => handleOpenImage()}
			>
				<View style={styles.container}>
					<Pressable
						style={{ ...styles.close, marginLeft: imageDimensions.width - 30 }}
						onPress={handleOpenImage}
					>
						<Ionicons name="close" size={30} color={Colors.white} />
					</Pressable>
					<Image
						style={{
							...styles.image,
							width: imageDimensions.width,
							height: imageDimensions.height
						}}
						source={{ uri: imageUrl }}
					/>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.9)'
	},
	imageThumb: {
		padding: 10,
		borderRadius: 20,
		width: 200,
		height: 200
	},
	close: {
		alignSelf: 'center'
	},
	image: {
		borderRadius: 20,
		resizeMode: 'contain'
	}
});

export default ImageFullScreen;
