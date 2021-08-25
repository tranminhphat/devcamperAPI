import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: './config.env' });

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
	console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
