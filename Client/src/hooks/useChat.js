/** @format */

import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/sllices/userSlice';
import { useState } from 'react';

export function useChat() {
	const user = useSelector(selectUser);
	const [friendsList, setFriendsList] = useState([]);
	const [isMessagingTabOpen, setIsMessageTabOpen] = useState(false);

	const [isFocused, setIsFocused] = useState(true);
	const [isOther, setIsOther] = useState(false);

	const handleMessagingTabOpen = () => {
		setIsMessageTabOpen((prevState) => !prevState);
	};

	const handleFocusChange = () => {
		setIsFocused((prevState) => !prevState);
		setIsOther((prevState) => !prevState);
	};

	const handleOtherChange = () => {
		setIsOther((prevState) => !prevState);
		setIsFocused((prevState) => !prevState);
	};

	return {
		user,
		friendsList,
		setFriendsList,
		handleMessagingTabOpen,
		setIsMessageTabOpen,
		isMessagingTabOpen,
		isFocused,
		handleFocusChange,
		isOther,
		handleOtherChange,
	};
}
