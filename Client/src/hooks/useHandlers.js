/** @format */

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkEmailExists, registerUser } from '../api/registrationAPI';
import { authenticateUser, fetcMyData } from '../api/userAPI';
import { login } from '../Redux/sllices/userSlice';
export function useHandlers() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLasttName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [strongPassword, setStrongPassword] = useState(false);
	const [matchedPassword, setMatchedPassword] = useState(false);
	const [visible, setVisible] = useState(false);
	const [revisible, setReVisible] = useState(false);
	const [warning, setWarning] = useState(false);
	const [warningMessage, setWarningMessage] = useState('');
	const [loading, setLoading] = useState(false); // New state for loading
	const [minChar, setMinChar] = useState(false);
	const [hasLowercase, setHasLowercase] = useState(false);
	const [hasUppercase, setHasUppercase] = useState(false);
	const [hasNumber, setHasNumber] = useState(false);
	const [hasSpecialChar, setHasSpecialChar] = useState(false);
	const [isPicForm, setIsPicForm] = useState(false);
	const [isFormOpened, setIsformOpened] = useState(false);

	const [noWhitespace, setNoWhitespace] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleNavigateToHome = () => {
		navigate('/');
	};
	const handleNavigateToMyNetwork = () => {
		navigate('/MyNetwork');
	};
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

	useEffect(() => {
		setStrongPassword(validatePassword(password, confirmPassword));
	}, [password, confirmPassword]);

	const handleInputChange = (setter) => (e) => {
		setter(e.target.value);
	};

	const toggleVisibility = (setter) => () => {
		setter((prev) => !prev);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!firstName || !lastName || !email || !password) {
			setWarning(true);
			setWarningMessage('Please fill in all fields');
			return;
		}

		if (!matchedPassword) {
			setWarning(true);
			setWarningMessage('Passwords do not match');
			return;
		}

		if (!strongPassword) {
			setWarning(true);
			setWarningMessage('Please enter a password that meets the requirements');
			return;
		}

		setLoading(true); // Start loading

		try {
			const exist = await checkEmailExists(email);
			if (exist.exists) {
				setWarningMessage('Email already exists');
				setWarning(true);
				setLoading(false); // Stop loading
				return;
			}

			const userData = { firstName, lastName, email, password };
			await registerUser(userData);
			const token = await authenticateUser({ email, password });
			const userInfo = await fetcMyData(token);
			console.log('type of: ', typeof userInfo);
			dispatch(login(userInfo));
			navigate('/');
		} catch (error) {
			console.error('Error during registration:', error);
			setWarningMessage('An error occurred during registration');
			setWarning(true);
		} finally {
			setLoading(false); // Stop loading regardless of success or failure
		}
	};

	const handleChangePic = () => {
		setIsPicForm(!isPicForm);
		console.log(isPicForm);
	};

	return {
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
		strongPassword,
		matchedPassword,
		visible,
		revisible,
		warning,
		warningMessage,
		loading,
		minChar,
		hasLowercase,
		hasUppercase,
		hasNumber,
		hasSpecialChar,
		noWhitespace,
		isPicForm,
		isFormOpened,
		setLoading,
		setFirstName,
		setLasttName,
		setEmail,
		setPassword,
		setConfirmPassword,
		togglePasswordVisibility: toggleVisibility(setVisible),
		toggleRePasswordVisibility: toggleVisibility(setReVisible),
		handleInputChange,
		handleSubmit,
		handleNavigateToHome,
		handleChangePic,
		setIsformOpened,
		handleNavigateToMyNetwork,

		onClose: () => setWarning(false),
	};
}
