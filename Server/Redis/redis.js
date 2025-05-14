/** @format */

// /** @format */

// import Redis from 'ioredis';
// import dotenv from 'dotenv';

// dotenv.config();

// // Function to create and return a Redis client instance
// export const createRedisClient = () => {
// 	const redis = new Redis({
// 		host: process.env.REDIS_HOST,
// 		port: process.env.REDIS_PORT,
// 		password: process.env.REDIS_PASSWORD,
// 		username: process.env.REDIS_USERNAME,
// 	});

// 	// Test the connection
// 	redis
// 		.ping()
// 		.then(() => console.log('Connected to Redis'))
// 		.catch((err) => console.error('Error connecting to Redis:', err));

// 	return redis;
// };
import { createClient } from 'redis';

// Create the Redis client
const redisClient = createClient();

// Handle connection error
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Initialize connection once (done outside other routes or functions)
(async () => {
	try {
		await redisClient.connect();
		console.log('Connected to Redis');
	} catch (err) {
		console.error('Failed to connect to Redis:', err);
	}
})();

// Export the client for use in other parts of the app
export default redisClient;
