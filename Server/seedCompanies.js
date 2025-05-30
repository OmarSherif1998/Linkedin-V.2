/** @format */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Company from './schema/company.js';

dotenv.config();

const companies = [
	{
		name: 'Google',
		industry: 'Internet',
		size: '10,000+',
		website: 'https://www.google.com',
		location: { city: 'Mountain View', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description:
			'Organizing the world’s information and making it universally accessible and useful.',
	},
	{
		name: 'Microsoft',
		industry: 'Software',
		size: '10,000+',
		website: 'https://www.microsoft.com',
		location: { city: 'Redmond', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description:
			'Empowering every person and every organization on the planet to achieve more.',
	},
	{
		name: 'Amazon',
		industry: 'E-commerce',
		size: '10,000+',
		website: 'https://www.amazon.com',
		location: { city: 'Seattle', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Earth’s most customer-centric company.',
	},
	{
		name: 'Apple',
		industry: 'Consumer Electronics',
		size: '10,000+',
		website: 'https://www.apple.com',
		location: { city: 'Cupertino', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description:
			'Innovative technology company known for iPhones, Macs, and more.',
	},
	{
		name: 'Meta',
		industry: 'Social Media',
		size: '10,000+',
		website: 'https://www.meta.com',
		location: { city: 'Menlo Park', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description:
			'Helping people build community and bring the world closer together.',
	},
	{
		name: 'Netflix',
		industry: 'Entertainment',
		size: '5,000-10,000',
		website: 'https://www.netflix.com',
		location: { city: 'Los Gatos', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Streaming entertainment to global audiences.',
	},
	{
		name: 'Spotify',
		industry: 'Music Streaming',
		size: '5,000-10,000',
		website: 'https://www.spotify.com',
		location: { city: 'Stockholm', country: 'Sweden' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description:
			'Digital music service that gives you access to millions of songs.',
	},
	{
		name: 'Salesforce',
		industry: 'CRM Software',
		size: '10,000+',
		website: 'https://www.salesforce.com',
		location: { city: 'San Francisco', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'World’s #1 CRM platform.',
	},
	{
		name: 'Airbnb',
		industry: 'Hospitality',
		size: '5,000-10,000',
		website: 'https://www.airbnb.com',
		location: { city: 'San Francisco', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Connecting people to unique travel experiences.',
	},
	{
		name: 'Uber',
		industry: 'Transportation',
		size: '10,000+',
		website: 'https://www.uber.com',
		location: { city: 'San Francisco', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Revolutionizing transportation through technology.',
	},
	{
		name: 'Tesla',
		industry: 'Automotive',
		size: '10,000+',
		website: 'https://www.tesla.com',
		location: { city: 'Palo Alto', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Accelerating the world’s transition to sustainable energy.',
	},
	{
		name: 'Adobe',
		industry: 'Creative Software',
		size: '10,000+',
		website: 'https://www.adobe.com',
		location: { city: 'San Jose', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Changing the world through digital experiences.',
	},
	{
		name: 'NVIDIA',
		industry: 'Semiconductors',
		size: '10,000+',
		website: 'https://www.nvidia.com',
		location: { city: 'Santa Clara', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Pioneering GPU computing and AI.',
	},
	{
		name: 'Oracle',
		industry: 'Enterprise Software',
		size: '10,000+',
		website: 'https://www.oracle.com',
		location: { city: 'Austin', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Integrated cloud applications and platform services.',
	},
	{
		name: 'Shopify',
		industry: 'E-commerce',
		size: '5,000-10,000',
		website: 'https://www.shopify.com',
		location: { city: 'Ottawa', country: 'Canada' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Making commerce better for everyone.',
	},
	{
		name: 'X',
		industry: 'Social Media',
		size: '5,000-10,000',
		website: 'https://www.x.com',
		location: { city: 'San Francisco', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'What’s happening and what people are talking about.',
	},
	{
		name: 'Zoom',
		industry: 'Video Conferencing',
		size: '5,000-10,000',
		website: 'https://www.zoom.us',
		location: { city: 'San Jose', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Video communications for everyone.',
	},
	{
		name: 'Slack',
		industry: 'Workplace Communication',
		size: '1,000-5,000',
		website: 'https://www.slack.com',
		location: { city: 'San Francisco', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Where work happens.',
	},
	{
		name: 'Stripe',
		industry: 'Fintech',
		size: '5,000-10,000',
		website: 'https://www.stripe.com',
		location: { city: 'San Francisco', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Payments infrastructure for the internet.',
	},
	{
		name: 'LinkedIn',
		industry: 'Professional Networking',
		size: '10,000+',
		website: 'https://www.linkedin.com',
		location: { city: 'Sunnyvale', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description:
			'Connect the world’s professionals to make them more productive and successful.',
	},
	{
		name: 'Intel',
		industry: 'Semiconductors',
		size: '10,000+',
		website: 'https://www.intel.com',
		location: { city: 'Santa Clara', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Creating world-changing technology.',
	},
	{
		name: 'IBM',
		industry: 'IT Services',
		size: '10,000+',
		website: 'https://www.ibm.com',
		location: { city: 'Armonk', country: 'USA' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Global leader in technology and consulting.',
	},
	{
		name: 'Accenture',
		industry: 'Consulting',
		size: '10,000+',
		website: 'https://www.accenture.com',
		location: { city: 'Dublin', country: 'Ireland' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Global professional services company.',
	},
	{
		name: 'Capgemini',
		industry: 'Consulting & IT',
		size: '10,000+',
		website: 'https://www.capgemini.com',
		location: { city: 'Paris', country: 'France' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description: 'Consulting, technology, and outsourcing services.',
	},
	{
		name: 'Siemens',
		industry: 'Industrial Automation',
		size: '10,000+',
		website: 'https://www.siemens.com',
		location: { city: 'Munich', country: 'Germany' },
		logo: 'https://res.cloudinary.com/linkedinpicdb/image/upload/v1748356555/defaultCompImg_ykkgzy.jpg',
		description:
			'Technology company focused on industry, infrastructure, and mobility.',
	},
];

const seed = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		await Company.deleteMany(); // optional: wipe old entries
		await Company.insertMany(companies);
		console.log('Companies seeded');
		process.exit();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

seed();
