import AsyncStorage from '@react-native-async-storage/async-storage';

const writeObjectData = async (key: string, value: object): Promise<any> => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
		console.log(`Data with the key ${key.toUpperCase()} is written`);
	} catch (error) {
		console.log(error);
	}
};

export default writeObjectData;
