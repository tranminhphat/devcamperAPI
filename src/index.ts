import express from 'express';
import morgan from 'morgan';
import config from './configs';
import { connectToDB } from './configs/connectDB';
import errorHandler from './middlewares/errorHandler';
import routes from './routes';

const app = express();

// Parse the request body
app.use(express.json());

// Connect to MongoDB
connectToDB(config.MONGO_URI as string);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/v1', routes);
app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () =>
	console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
