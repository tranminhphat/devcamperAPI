import mongoose from 'mongoose';

const BootcampSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			unique: true,
			trim: true,
			maxLength: [50, 'Name can not be more than 50 characters'],
		},
		slug: String,
		description: {
			type: String,
			required: [true, 'Please add a description'],
			maxLength: [500, 'Description can not be more than 50 characters'],
		},
		website: {
			type: String,
			match: [
				/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
				'Please use a valid URL with HTTP or HTTPS',
			],
		},
		phone: {
			type: String,
			maxLength: [20, 'Phone number can not be longer than 20 characters'],
		},
		email: {
			type: String,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Please add an valid email',
			],
		},
		address: {
			type: String,
			require: [true, 'Please add an address'],
		},
		// location: {
		// 	//GeoJSON Point
		// 	type: {
		// 		type: String,
		// 		enum: ['Point'],
		// 		required: true,
		// 	},
		// 	coordinates: {
		// 		type: [Number],
		// 		require: true,
		// 		index: '2dsphere',
		// 	},
		// 	formattedAddress: String,
		// 	street: String,
		// 	city: String,
		// 	state: String,
		// 	zipcode: String,
		// 	country: String,
		// },
		careers: {
			type: [String],
			required: true,
			enum: [
				'Web Development',
				'Mobile Development',
				'UI/UX',
				'Data Science',
				'Business',
				'Other',
			],
		},
		averageRating: {
			type: Number,
			min: [1, 'Rating must be at least 1'],
			max: [10, 'Rating can not be more than 10'],
		},
		averageCose: Number,
		photo: {
			type: String,
			default: 'no-photo.jpg',
		},
		housing: {
			type: Boolean,
			default: false,
		},
		jobAssistance: {
			type: Boolean,
			default: false,
		},
		jobGuarantee: {
			type: Boolean,
			default: false,
		},
		acceptGi: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Bootcamp = mongoose.model('Bootcamp', BootcampSchema);

export default Bootcamp;
