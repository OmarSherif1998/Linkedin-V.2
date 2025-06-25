/** @format */
import mongoose from 'mongoose';
import fs from 'fs/promises';
import User from './schema/user.js';
import dotenv from 'dotenv';

dotenv.config();

const connection = process.env.MONGO;
console.log('MongoDB Connection String:', connection);

mongoose
	.connect(connection)
	.then(() => console.log('DB connected'))
	.catch((err) => console.error('DB connection error:', err));

// ✅ Absolute path to the JSON file
const filePath = 'C:\\Users\\omara\\Downloads\\cleaned_generated_users.json';

async function seedUsers() {
	try {
		await mongoose.connect(connection, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('✅ Connected to MongoDB.');

		const users = JSON.parse(await fs.readFile(filePath, 'utf-8'));

		await User.deleteMany({});
		console.log('🧹 Cleared existing users.');

		await User.insertMany(users);
		console.log(`✅ Inserted ${users.length} users.`);

		await mongoose.disconnect();
		console.log('🔌 Disconnected from MongoDB.');
	} catch (err) {
		console.error('❌ Error seeding users:', err);
		process.exit(1);
	}
}

seedUsers();
