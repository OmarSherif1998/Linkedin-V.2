/** @format */

import React, { useState } from 'react';
import axios from 'axios';

const TestUploadForm = () => {
	const [file, setFile] = useState(null);
	const [uploadUrl, setUploadUrl] = useState('');
	const [error, setError] = useState('');

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!file) {
			setError('Please select a file');
			return;
		}

		const formData = new FormData();
		formData.append('postPic', file);

		try {
			const response = await axios.post(
				'http://localhost:3001/files/uploadPostPic',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			setUploadUrl(response.data.url);
			setError('');
		} catch (error) {
			setError('Error uploading file');
		}
	};

	return (
		<div className='p-4'>
			<form onSubmit={handleSubmit} className='flex flex-col items-center'>
				<input type='file' onChange={handleFileChange} className='mb-2' />
				<button
					type='submit'
					className='px-4 py-2 text-white bg-blue-500 rounded'
				>
					Upload
				</button>
			</form>
			{uploadUrl && (
				<div className='mt-4'>
					<p>File uploaded successfully!</p>
					<img src={uploadUrl} alt='Uploaded' className='mt-2' />
				</div>
			)}
			{error && <p className='mt-2 text-red-500'>{error}</p>}
		</div>
	);
};

export default TestUploadForm;
