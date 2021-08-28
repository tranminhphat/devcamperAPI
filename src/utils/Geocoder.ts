import NodeGeocoder, { Options } from 'node-geocoder';
import config from '../configs';

const options: Options = {
	provider: config.GEOCODER_PROVIDER as 'mapquest',
	httpAdapter: 'https',
	apiKey: config.GEOCODER_API_KEY,
	formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
