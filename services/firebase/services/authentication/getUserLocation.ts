import * as Location from 'expo-location';

const getUserLocation = async (): Promise<any> => {
	const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
	if (locationStatus !== 'granted') {
		console.log('Permission to access location was denied');
	}

	console.log(`From getUserLocation: Permission status: ${locationStatus}`);

	return new Promise(async (resolve, reject) => {
		const location = await Location.getCurrentPositionAsync({});
		resolve({
			locationStatus,
			location: location.coords
		});
	});
};

export { getUserLocation };
