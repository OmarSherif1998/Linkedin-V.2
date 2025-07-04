/** @format */

import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redis = new Redis({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
	password: process.env.REDIS_PASSWORD,
	username: process.env.REDIS_USERNAME,
});

// Test the connection
redis
	.ping()
	.then(() => console.log('Connected to Redis'))
	.catch((err) => console.error('Error connecting to Redis:', err));

export default redis;
