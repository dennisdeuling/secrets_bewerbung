interface ChatInterface {
	[chatId: string]: ChatData;
}

type ChatData = {
	senderId: string;
	receiverId: string;
	secretId: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	image?: string;
};

export { ChatInterface, ChatData };
