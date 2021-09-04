import nodemailer, { TransportOptions } from 'nodemailer';
import config from '../configs';

interface MessageOptions {
	email: string;
	subject: string;
	message: string;
}

const sendEmail = async (options: MessageOptions) => {
	const transporter = nodemailer.createTransport({
		host: config.SMTP_HOST,
		port: config.SMTP_PORT,
		secure: false, // true for 465, false for other ports
		auth: {
			user: config.SMTP_EMAIL,
			pass: config.SMTP_PASSWORD,
		},
	} as TransportOptions);

	let message = {
		from: `${config.FROM_NAME} <${config.FROM_EMAIL}>`,
		to: options.email,
		subject: options.subject,
		text: options.message,
	};

	const info = (await transporter.sendMail(message)) as any;

	console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
