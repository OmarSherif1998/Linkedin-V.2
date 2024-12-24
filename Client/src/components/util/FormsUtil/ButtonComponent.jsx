/** @format */

import React from 'react';

function ButtonComponent({ buttonClass, buttonHandler, buttonText }) {
	return (
		<button
			className={`${buttonClass} text-LinkedInBlue my-5 p-2 hover:text-blue-900 hover:bg-blue-50 w-fit rounded-lg`}
			onClick={buttonHandler}
		>
			{buttonText}
		</button>
	);
}

export default ButtonComponent;
