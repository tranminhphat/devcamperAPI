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

courseSchema.statics.updateBootcampAverageCost = async function (bootcampId) {
	const query = await this.aggregate([
		{
			$match: { bootcamp: bootcampId },
		},
		{
			$group: {
				_id: '$bootcamp',
				averageCost: { $avg: '$tuition' },
			},
		},
	]);

	try {
		await (this as any).model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageCost: Math.ceil(query[0].averageCost / 10) * 10,
		});
	} catch (err) {
		console.error(err);
	}
};

// Calculate bootcamp average cost after save
courseSchema.post('save', async function () {
	this.constructor.updateBootcampAverageCost(this.bootcamp);
});

// Calculate bootcamp average cost before delete
courseSchema.pre('remove', async function (next) {
	this.constructor.updateBootcampAverageCost(this.bootcamp);
	next();
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
