import React, { FunctionComponent, ReactElement, useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { SecretInterface } from '../services/firebase/models/secret.interface';

import { SecretContext } from '../context/secret.context';

import SecretCard from '../components/secrets/secret_card/SecretCard';

import { SecretStackProps } from '../navigation/SecretStackNavigation';

type SecretsNavigationProps = NativeStackScreenProps<SecretStackProps, 'Secret List'>;

const SecretListScreen: FunctionComponent<SecretsNavigationProps> = ({
	route,
	navigation
}): JSX.Element => {
	const { allSecrets, sortedByLocation, sortedByTimeStamp, sortedByPopularity } =
		useContext(SecretContext);
	const { name } = route;
	let secrets =
		name.toLowerCase() === 'all'
			? allSecrets
			: name.toLowerCase() === 'location'
			? sortedByLocation
			: name.toLowerCase() === 'newest'
			? sortedByTimeStamp
			: name.toLowerCase() === 'popular'
			? sortedByPopularity
			: null;

	const renderSecretCard = (itemData): ReactElement => {
		const secret: SecretInterface = itemData.item;

		const pressHandler = (): void => {
			navigation.navigate('Secret Detail', { secret });
		};
		return <SecretCard secret={secret} onPress={pressHandler} />;
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={secrets}
				renderItem={renderSecretCard}
				keyExtractor={item => Object.keys(item)[0]}
				numColumns={3}
				initialNumToRender={12}
				maxToRenderPerBatch={10}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {}
});

export default SecretListScreen;
