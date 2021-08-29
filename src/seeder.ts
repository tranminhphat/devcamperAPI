import fs from 'fs';
import mongoose from 'mongoose';
import config from './configs';
import Bootcamp from './models/Bootcamp';

// Connect to DB
mongoose.connect(config.MONGO_URI as string);

// Read data
const bootcamps = JSON.parse(
	fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8')
);

// Import data to DB
const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);
		console.log('Data imported successfully ✓');
		process.exit();
	} catch (err) {
		console.error(err);
	}
};

// Delete data from DB
const deleteData = async () => {
	try {
		await Bootcamp.deleteMany();
		console.log('Data deleted successfully ✓');
		process.exit();
	} catch (err) {
		console.log(err);
	}
};

if (process.argv[2] === '-i') {
	importData();
} else if (process.argv[2] === '-d') {
	deleteData();
}
