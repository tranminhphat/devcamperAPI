import mongoose from 'mongoose';

export const connectToDB = async (uri: string) => {
	const conn = await mongoose.connect(uri);

	console.log(`MongoDB connected: ${conn.connection.host}`);
};
