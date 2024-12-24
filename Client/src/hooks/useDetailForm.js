/** @format */

// Custom Hook (useDetailForm.js)
import { useState } from 'react';

function useDetailForm(currentUser) {
	const [firstName, setFirstName] = useState(currentUser.firstName || '');
	const [lastName, setLastName] = useState(currentUser.lastName || '');
	const [bio, setBio] = useState(currentUser.bio || '');
	const [experience, setExperience] = useState(currentUser.experience || '');
	const [education, setEducation] = useState(currentUser.education || '');
	const [location, setLocation] = useState(currentUser.location || '');
	const [city, setCity] = useState(currentUser.city || '');

	// Return state and setters grouped by their field names
	return {
		values: {
			firstName,
			lastName,
			bio,
			experience,
			education,
			location,
			city,
		},
		setters: {
			setFirstName,
			setLastName,
			setBio,
			setExperience,
			setEducation,
			setLocation,
			setCity,
		},
	};
}

export { useDetailForm };
