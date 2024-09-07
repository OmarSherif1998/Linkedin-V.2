/** @format */
//fileRouter.js
import express from 'express';
import {
	uploadProfilePictures,
	uploadPostsPictures,
} from '../storage/multerConfig.js';
const fileRouter = express.Router();
const MAX_FILES = 5;
fileRouter.post(
	'/uploadProfilePic',
	uploadProfilePictures.single('profilePic'),
	(req, res) => {
		try {
			// Upload file logic here
			const file = req.file;
			if (!file) {
				res.status(400).json({ message: 'File not found' });
			}

			res.status(200).json({ url: file.path });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'An error occurred while uploading the file.' });
		}
	}
);
fileRouter.post(
	'/uploadPostPic',
	uploadPostsPictures.array('postPic', MAX_FILES),
	(req, res) => {
		try {
			// Upload file logic here
			const files = req.file;
			if (!files || files.length === 0) {
				res.status(400).json({ message: 'File not found' });
			} else if (files > MAX_FILES) {
				res.status(400).json({ message: 'Too many files' });
				return;
			}

			res.status(200).json({ urls: files.map((file) => file.path) });
		} catch (error) {
			res
				.status(500)
				.json({ message: 'An error occurred while uploading the files.' });
		}
	}
);

export default fileRouter;
