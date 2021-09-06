import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import config from './configs';
import { connectToDB } from './configs/connectDB';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// Parse the request body
app.use(express.json());

// Parse cookie object
app.use(cookieParser());

// Connect to MongoDB
connectToDB(config.MONGO_URI as string);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Sanitize data
app.use(mongoSanitize());

// Security headers
app.use(helmet());

// Enable cors
app.use(cors());

// Limit requests
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(fileUpload());
app.use('/api/v1', routes);
app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () =>
	console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
