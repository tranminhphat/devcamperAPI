import 'dotenv/config';

export default {
	PORT: process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
	GEOCODER_PROVIDER: process.env.GEOCODER_PROVIDER,
	GEOCODER_API_KEY: process.env.GEOCODER_API_KEY,
};
