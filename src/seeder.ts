import fs from 'fs';
import mongoose from 'mongoose';
import config from './configs';
import Bootcamp from './models/Bootcamp';
import Course from './models/Course';

// Connect to DB
mongoose.connect(config.MONGO_URI as string);

// Read data
const bootcamps = JSON.parse(
	fs.readFileSync(`${__dirname}/data/bootcamps.json`, 'utf-8')
);
const courses = JSON.parse(
	fs.readFileSync(`${__dirname}/data/courses.json`, 'utf-8')
);

// Import data to DB
const importData = async () => {
	try {
		await Bootcamp.create(bootcamps);
		await Course.create(courses);
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
		await Course.deleteMany();
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
