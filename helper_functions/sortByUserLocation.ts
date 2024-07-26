import { getDistanceFromLatLonInKm } from './getDistanceFromLatLonInKm';
import { SecretInterface } from '../services/firebase/models/secret.interface';

function sortByUserLocation(
	secrets: SecretInterface[],
	location: { latitude: number; longitude: number }
): SecretInterface[] {
	const { latitude: userLat, longitude: userLong } = location;

	const newSecrets = JSON.parse(JSON.stringify(secrets));

	newSecrets.map(secret => {
		const { latitude: secrLat, longitude: secrLong } = secret[Object.keys(secret)[0]].location;
		secret.distance = getDistanceFromLatLonInKm(userLat, userLong, secrLat, secrLong);
		return secret;
	});

	newSecrets.sort((a, b) => a.distance - b.distance);
	return newSecrets;
}

export { sortByUserLocation };
