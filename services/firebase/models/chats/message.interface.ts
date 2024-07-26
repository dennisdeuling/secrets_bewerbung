interface MessageInterface {
	message: string;
	senderId: string;
	createdAt: {
		nanoseconds: number;
		seconds: number;
		toDate(): Date;
	};
	read: boolean

}

export { MessageInterface };
