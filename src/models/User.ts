import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import config from '../configs';

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
		},
		email: {
			type: String,
			required: [true, 'Please add an email'],
			unique: true,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Please add an valid email',
			],
		} as any,
		role: {
			type: String,
			enum: ['user', 'publisher'],
			default: 'user',
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
			minlength: [6, 'Password must greater than 5 characters'],
			select: false,
		},
		resetPasswordToken: String,
		resetPasswordExpire: Date,
	},
	{ timestamps: true }
);

// Create signed JWT
userSchema.methods.getSignedJwt = function () {
	return jwt.sign({ id: this._id }, config.JWT_SECRET as string, {
		expiresIn: config.JWT_EXPIRE,
	});
};

// Encrypted password before save in DB
userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

const User = mongoose.model('User', userSchema);

export default User;
