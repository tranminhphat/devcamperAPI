import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';

// Load enviroment variables
dotenv.config({ path: './config.env' });

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use('/api/v1', routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
	console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
