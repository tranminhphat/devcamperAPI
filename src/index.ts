import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

// Load enviroment variables
dotenv.config({ path: './config.env' });

const app = express();

app.use('/api/v1', routes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
	console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
