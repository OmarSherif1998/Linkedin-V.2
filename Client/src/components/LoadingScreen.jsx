/** @format */

// LoadingScreen.jsx
import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<img
				src='https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg'
				alt='LinkedIn Logo'
				className='w-40 mb-6'
			/>
			<div className='bg-gray-600 w-60'>
				<motion.div
					className='relative h-1 bg-blue-600 rounded w-28'
					animate={{ x: [0, 100, 0] }}
					transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
				></motion.div>
			</div>
		</div>
	);
};

export default LoadingScreen;
