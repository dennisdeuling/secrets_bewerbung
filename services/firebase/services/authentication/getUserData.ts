import { signInAnon } from './signInAnon';
import { getUserId } from './getUserId';
import { getUserLocation } from './getUserLocation';
import { UserInterface } from '../../models/user.interface';
import * as Device from 'expo-device';

const getUserData = async (): Promise<UserInterface> => {
	return new Promise(async resolve => {
		const signIn = await signInAnon();
		const userId = await getUserId();
		const location = await getUserLocation();

		Promise.all([signIn, userId, location]).then(async result => {
			const { location } = result[2];
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&result_type=locality&key=${process.env.GEOCODING_API}`
			);
			const json = await response.json();
			location.city = json.results[0].address_components[0].long_name;

			const user: UserInterface = {
				signInMethod: result[0].toString(),
				userId: result[1].toString(),
				deviceInfo: Device.modelId,
				location: location,
				locationStatus: result[2].locationStatus
			};

			resolve(user);
		});
	});
};

export { getUserData };
