/** @format */

import React from 'react';
import linkedin from '../../images/linkedin.png';
function LoggedUserFooter() {
	const footerContent = [
		'About',
		'Accessibility',
		'Help Center',
		'Privacy & Terms ',
		'Ad Choices',
		'Advertising',
		'Business Services ',
		'Get the LinkedIn app',
		'More',
	];

	return (
		<footer className='w-full pb-5 text-gray-600 '>
			<section className='grid w-[80%] mx-auto grid-cols-3 gap-4 py-4 text-sm'>
				{footerContent.map((content, idx) => (
					<p
						key={idx}
						className='text-xs font-light text-center cursor-pointer hover:underline'
					>
						{content}
					</p>
				))}
			</section>

			<section className='flex items-center justify-center gap-2 py-2 text-sm'>
				<img src={linkedin} className='w-16 h-auto' alt='LinkedIn Logo' />
				<h1>LinkedIn Corporation © 2024</h1>
			</section>
		</footer>
	);
}

export default LoggedUserFooter;
