import development from './development';
import production from './production';

// Set up your own development config, take production config as an example
const config =
	process.env.NODE_ENV === 'development' ? development : production;

export default config;
