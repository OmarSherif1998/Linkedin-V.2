/** @format */

import React from 'react';

function OtherButton({ handleOtherChange, isOther }) {
	return (
		<button
			onClick={handleOtherChange}
			className={`w-full p-1 py-2 border border-b-2 hover:bg-gray-100 ${
				isOther ? 'border-b-green-500' : null
			}`}
		>
			Other
		</button>
	);
}

export default OtherButton;
