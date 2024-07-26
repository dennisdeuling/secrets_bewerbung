enum FirebaseFirestore {
	chats = 'chats',
	secrets = 'secrets',
	users = 'users'
}

enum FirebaseStorage {
	secretImages = 'secretImages',
	chatPictures = 'chatPictures'
}

const FirebaseConstants = {
	firestoreChats: FirebaseFirestore.chats,
	firestoreSecrets: FirebaseFirestore.secrets,
	firestoreUsers: FirebaseFirestore.users,
	storageSecretImages: FirebaseStorage.secretImages,
	storageChatPictures: FirebaseStorage.chatPictures
};

export { FirebaseConstants };
