import 'dotenv/config';

export default {
	PORT: process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
	GEOCODER_PROVIDER: process.env.GEOCODER_PROVIDER,
	GEOCODER_API_KEY: process.env.GEOCODER_API_KEY,
	FILE_UPLOAD_PATH: process.env.FILE_UPLOAD_PATH,
	MAX_FILE_UPLOAD_SIZE: process.env.MAX_FILE_UPLOAD_SIZE,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRE: process.env.JWT_EXPIRE,
	JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
};
