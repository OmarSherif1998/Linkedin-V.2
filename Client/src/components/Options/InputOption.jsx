/** @format */

import React from 'react';

function InputOption({ Icon, title, color }) {
	// Define the classes for each option
	const colorClasses = {
		Like: ' hover:text-likeColor',
		Comment: ' hover:text-orange-500',
		Repost: ' hover:text-green-500',
		Send: ' hover:text-black',
	};

	// Fallback to an empty string if title does not match any case
	const colorClass = colorClasses[title] || '';

	return (
		<div
			className={`flex gap-1 items-center cursor-pointer text-gray-600 ${colorClass} hover:bg-gray-100  rounded-lg`}
		>
			<Icon style={{ color: color }} />
			<h4>{title}</h4>
		</div>
	);
}

export default InputOption;
