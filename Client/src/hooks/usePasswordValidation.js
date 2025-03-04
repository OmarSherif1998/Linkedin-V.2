/** @format */

import { useState } from 'react';

const usePasswordValidation = () => {
	const [minChar, setMinChar] = useState(false);
	const [hasLowercase, setHasLowercase] = useState(false);
	const [hasUppercase, setHasUppercase] = useState(false);
	const [hasNumber, setHasNumber] = useState(false);
	const [hasSpecialChar, setHasSpecialChar] = useState(false);
	const [noWhitespace, setNoWhitespace] = useState(false);
	const [matchedPassword, setMatchedPassword] = useState(false);

	const validatePassword = (password, confirmPassword) => {
		const meetsRequirements = {
			minChar: password.length >= 8,
			hasLowercase: /[a-z]/.test(password),
			hasUppercase: /[A-Z]/.test(password),
			hasNumber: /[0-9]/.test(password),
			hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
			noWhitespace: !/\s/.test(password),
			matchPasswords: password === confirmPassword,
		};

		setMinChar(meetsRequirements.minChar);
		setHasLowercase(meetsRequirements.hasLowercase);
		setHasUppercase(meetsRequirements.hasUppercase);
		setHasNumber(meetsRequirements.hasNumber);
		setHasSpecialChar(meetsRequirements.hasSpecialChar);
		setNoWhitespace(meetsRequirements.noWhitespace);
		setMatchedPassword(meetsRequirements.matchPasswords);

		return Object.values(meetsRequirements).every(Boolean);
	};

	return {
		validatePassword,
		minChar,
		hasLowercase,
		hasUppercase,
		hasNumber,
		hasSpecialChar,
		noWhitespace,
		matchedPassword,
	};
};

export default usePasswordValidation;
