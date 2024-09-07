/** @format */

// multerConfig.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig.js';

// Cloudinary storage setup for profile pictures
const profilePictures = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'profile_Pictures', // Optional: specify folder on Cloudinary
		allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
	},
});

// Cloudinary storage setup for posts pictures
const postsPictures = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'posts_Pictures',
		allowed_formats: ['jpg', 'png', 'jpeg'], // Fixed typo: removed extra comma
	},
});

// Create multer instances with Cloudinary storage
const uploadProfilePictures = multer({ storage: profilePictures });
const uploadPostsPictures = multer({ storage: postsPictures });

// Export the instances individually
export { uploadProfilePictures, uploadPostsPictures };
