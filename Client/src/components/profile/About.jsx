/** @format */

import React, { useState } from 'react';

function About({ userDetails }) {
	const [isExpanded, setIsExpanded] = useState(false); // State to track expanded/collapsed view
	const aboutText = userDetails?.about || ''; // Optional chaining for undefined handling
	const characterLimit = 100; // Define the limit for trimmed text

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
		<div className='p-2 bg-white border border-gray-400 rounded-lg shadow-xl'>
			<h1 className='text-lg font-semibold text-black'>About</h1>
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
