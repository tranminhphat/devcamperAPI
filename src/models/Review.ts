import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			trim: true,
			required: [true, 'Please add a title for the review'],
			maxlength: 100,
		},
		text: {
			type: String,
			required: [true, 'Please add some text'],
		},
		rating: {
			type: Number,
			min: 1,
			max: 10,
			required: [true, 'Please add a rating between 1 and 10'],
		},
		bootcamp: {
			type: mongoose.Types.ObjectId,
			ref: 'Bootcamp',
			required: true,
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
);

// User can only add one review per one bootcamp
// This prevent user add multiple review on a bootcamp
reviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

reviewSchema.statics.updateBootcampAverageRating = async function (bootcampId) {
	const query = await this.aggregate([
		{
			$match: { bootcamp: bootcampId },
		},
		{
			$group: {
				_id: '$bootcamp',
				averageRating: { $avg: '$rating' },
			},
		},
	]);

	try {
		await (this as any).model('Bootcamp').findByIdAndUpdate(bootcampId, {
			averageRating: query[0].averageRating,
		});
	} catch (err) {
		console.error(err);
	}
};

// Calculate bootcamp average rating after save
reviewSchema.post('save', async function () {
	this.constructor.updateBootcampAverageRating(this.bootcamp);
});

// Calculate bootcamp average rating before delete
reviewSchema.pre('remove', async function (next) {
	this.constructor.updateBootcampAverageRating(this.bootcamp);
	next();
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
