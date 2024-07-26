import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const environment: string = process.env.NODE_ENV;

console.log(process.env.NODE_ENV);

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID,
	measurementId: process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
const authentication = getAuth();

// const analytics = isSupported().then(yes => (yes ? getAnalytics(app) : null));

// if (environment === 'development') {
// 	connectFirestoreEmulator(database, '127.0.0.1', 8080);
// 	connectStorageEmulator(storage, '127.0.0.1', 9199);
// 	connectAuthEmulator(authentication, 'http://localhost:9099');
// }

export { app, database, storage, authentication };
