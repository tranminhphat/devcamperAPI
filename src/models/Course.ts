import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Please add a course title'],
		},
		description: {
			type: String,
			required: [true, 'Please add a description'],
		},
		weeks: {
			type: String,
			required: [true, 'Please add number of weeks'],
		},
		tuition: {
			type: Number,
			required: [true, 'Please add a tuition cost'],
		},
		minimumSkill: {
			type: String,
			required: [true, 'Please add a minimum skill'],
			enum: ['beginner', 'intermediate', 'advanced'],
		},
		scholarshipAvailable: {
			type: Boolean,
			default: false,
		},
		bootcamp: {
			type: mongoose.Types.ObjectId,
			ref: 'Bootcamp',
			required: true,
		},
	},
	{ timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
