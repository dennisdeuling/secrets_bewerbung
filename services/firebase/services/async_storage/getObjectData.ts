import AsyncStorage from '@react-native-async-storage/async-storage';

const getObjectData = async (key: string): Promise<any> => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		const result = jsonValue ? JSON.parse(jsonValue) : null;

		if (result) {
			console.log(`Got data with the key ${key.toUpperCase()}`);
			return result;
		} else {
			throw new Error(`The data with the key ${key.toUpperCase()} doesn't exist`);
		}
	} catch (error) {
		console.log(error);
	}
};

export default getObjectData;
