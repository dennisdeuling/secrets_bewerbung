interface UserInterface {
	userId?: string;
	deviceInfo?: string;
	locationStatus?: string;
	signInMethod?: string;
	location?: {
		accuracy: number;
		altitude: number;x
		altitudeAccuracy: number;
		heading: number;
		latitude: number;
		longitude: number;
		speed: number;
		city: string;
	};
	// createdAt: {
	// 	seconds: number;
	// 	nanoseconds: number;
	// };
	oldUserIds?: string[];
}

export { UserInterface };
