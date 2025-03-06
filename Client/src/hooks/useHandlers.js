/** @format */

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

export function useHandlers() {
	const [isPicForm, setIsPicForm] = useState(false);
	const [isFormOpened, setIsformOpened] = useState(false);

	const navigate = useNavigate();
	const handleNavigateToHome = () => {
		navigate('/');
	};
	const handleNavigateToMyNetwork = () => {
		navigate('/MyNetwork');
	};

	const handleChangePic = () => {
		setIsPicForm(!isPicForm);
		console.log(isPicForm);
	};

	return {
		isPicForm,
		isFormOpened,

		handleNavigateToHome,
		handleChangePic,
		setIsformOpened,
		handleNavigateToMyNetwork,
	};
}
