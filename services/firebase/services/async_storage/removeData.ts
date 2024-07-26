import AsyncStorage from '@react-native-async-storage/async-storage';

const removeData = async (key: string): Promise<any> => {
	try {
		await AsyncStorage.removeItem(key);
		console.log(`${key.toUpperCase()} has been removed`);
	} catch (error) {
		console.log(error);
	}
};

export default removeData;
