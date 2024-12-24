/** @format */

import React, { useState } from 'react';

const SwitchButton = () => {
	const [isActive, setIsActive] = useState(false);

	const toggleSwitch = () => setIsActive(!isActive);

	return (
		<div
			className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition ${
				isActive ? 'bg-green-500' : 'bg-gray-400'
			}`}
			onClick={toggleSwitch}
		>
			<div
				className={`w-6 h-6 bg-white rounded-full shadow-md transform transition ${
					isActive ? 'translate-x-6' : 'translate-x-0'
				}`}
			></div>
		</div>
	);
};

export default SwitchButton;
