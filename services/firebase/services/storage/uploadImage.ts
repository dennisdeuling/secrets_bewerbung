import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.config';
import { FirebaseConstants } from '../constants';

const uploadImage = async (image): Promise<string> => {
	if (Platform.OS !== 'web') {
		const { status: ImageStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (ImageStatus !== 'granted') {
			alert('Sorry, we need camera roll permissions to make this work!');
		}
		console.log(`From uploadImage: Permission status: ${ImageStatus}`);
	}

	const { uri } = image;
	const imageName: [] = uri.split('/');
	const name: string = imageName[imageName.length - 1];

	const response = await fetch(uri);
	const file = await response.blob();

	return new Promise<string>(async (resolve, reject) => {
		const storageRef = ref(storage, `${FirebaseConstants.storageSecretImages}/${name}`);
		const metadata = {
			contentType: 'image/jpeg'
		};

		const uploadTask = uploadBytesResumable(storageRef, file, metadata);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			'state_changed',
			snapshot => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log(`Upload is ${progress} % done`);
			},
			error => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				reject(error);
			},
			async () => {
				// Upload completed successfully, now we can get the download URL
				const url = await getDownloadURL(uploadTask.snapshot.ref);
				resolve(url);
			}
		);
	});
};

export { uploadImage };
