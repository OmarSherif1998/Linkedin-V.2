/** @format */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './schema/user.js'; // Adjust the path if needed
import { faker } from '@faker-js/faker';
dotenv.config();

const connection = process.env.MONGO;
console.log('MongoDB Connection String:', connection);

mongoose
	.connect(connection)
	.then(() => console.log('DB connected'))
	.catch((err) => console.error('DB connection error:', err));

const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
};

const createDummyUsers = async (hashedPassword) => {
	return Array.from({ length: 50 }, () => ({
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		bio: faker.person.bio(),
		email: faker.internet.email(),
		password: hashedPassword,
		birthday: faker.date.birthdate().toISOString().split('T')[0],
		phoneNumber: faker.phone.number(),
		location: faker.location.city(),
		city: faker.location.city(),
		about: faker.lorem.sentence(),
		gender: faker.person.sex(),
		experiences: [
			{
				companyName: faker.company.name(),
				jobTitle: faker.person.jobTitle(),
				employmentType: 'Full-time',
				location: faker.location.city(),
				locationType: 'On-site',
				startDate: faker.date.past().toISOString().split('T')[0],
				endDate: faker.date.future().toISOString().split('T')[0],
				description: faker.lorem.sentence(),
				isCurrent: false,
			},
		],
		licensesAndCertifications: [faker.lorem.words(3)],
		skills: [faker.hacker.verb(), faker.hacker.noun()],
		education: [
			{
				institutionName: faker.company.name(),
				degree: 'BSc Computer Science',
				major: faker.person.jobArea(),
				educationStartDate: faker.date.past().toISOString().split('T')[0],
				educationEndDate: faker.date.future().toISOString().split('T')[0],
				isCurrent: false,
			},
		],
		languages: [faker.location.country()],
		posts: [],
		comments: [],
		SavedPosts: [],
		connections: [],
	}));
};

const randomizeConnections = (users) => {
	users.forEach((user) => {
		const numConnections = Math.floor(Math.random() * 10) + 1; // Each user gets 1-10 connections
		const connections = new Set();

		while (connections.size < numConnections) {
			const randomUser = users[Math.floor(Math.random() * users.length)];
			if (randomUser._id !== user._id) {
				connections.add(randomUser._id);
			}
		}

		user.connections = Array.from(connections);
	});

	return users;
};

const seedData = async () => {
	try {
		await User.deleteMany({});
		console.log('Existing users cleared');

		const hashedPassword = await hashPassword('Jeeo19982001!');
		const usersData = await createDummyUsers(hashedPassword);

		const insertedUsers = await User.insertMany(usersData);
		console.log('Dummy users inserted');

		const usersWithConnections = randomizeConnections(insertedUsers);
		await Promise.all(usersWithConnections.map((user) => user.save()));
		console.log('Random connections assigned');
	} catch (err) {
		console.error('Error seeding data:', err);
	} finally {
		mongoose.connection.close();
	}
};

seedData();
