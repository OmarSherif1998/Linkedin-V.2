/** @format */

export const calcDates = (input) => {
	const now = Date.now();

	// Helper function to calculate the time difference
	const calculateTimeDiff = (dateString) => {
		let date = new Date(dateString).getTime();
		let timeDiff = now - date;
		return formatDiff(timeDiff);
	};

	// Check if the input is an array
	if (Array.isArray(input)) {
		return input.map((post) => calculateTimeDiff(post?.createdAt || post));
	}

	// Check if the input is a single object
	else if (typeof input === 'object' && input !== null) {
		return calculateTimeDiff(input?.createdAt);
	}

	// Check if the input is a string
	else if (typeof input === 'string') {
		return calculateTimeDiff(input);
	}

	// Handle invalid inputs
	else {
		throw new Error(
			'Invalid input: expected a string, an object, or an array of objects.'
		);
	}
};

const formatDiff = (timeDiff) => {
	const seconds = Math.floor(timeDiff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
	if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
	if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''}`;
	if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
	if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
	if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
	return `${seconds} second${seconds > 1 ? 's' : ''}`;
};
