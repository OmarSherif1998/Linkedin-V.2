/** @format */

import React, { useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
function About({ userDetails }) {
	const [isExpanded, setIsExpanded] = useState(false); // State to track expanded/collapsed view
	const aboutText = userDetails?.about || ''; // Optional chaining for undefined handling
	const characterLimit = 400; // Define the limit for trimmed text

	// Toggle function to switch between expanded and collapsed state
	const toggleExpansion = () => {
		setIsExpanded(!isExpanded);
	};

	// Determine the text to display based on expansion state
	const displayText = isExpanded
		? aboutText
		: aboutText.substring(0, characterLimit) +
		  (aboutText.length > characterLimit ? '...' : '');

	return (
		<div className='p-4 bg-white border border-gray-400 rounded-lg shadow-xl min-h-[8rem] '>
			<section className='flex items-center justify-between'>
				<h1 className='text-lg font-semibold text-black'>About</h1>{' '}
				<ModeEditIcon
					fontSize='large'
					className='p-2 rounded-full cursor-pointer hover:bg-gray-100'
				/>
			</section>

			<p className='text-sm'>{displayText}</p>
			{aboutText.length > characterLimit && (
				<button
					onClick={toggleExpansion}
					className='flex mt-2 ml-auto text-gray-500 focus:outline-none hover:underline hover:text-LinkedInBlue'
				>
					{isExpanded ? 'Show less' : 'Show more'}
				</button>
			)}
		</div>
	);
}

export default About;
