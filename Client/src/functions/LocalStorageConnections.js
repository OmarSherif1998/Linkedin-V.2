/** @format */

export function LocalStorageConnections(id) {
	const storedConnections = localStorage.getItem(`connections_${id}`);
	//	console.log('storedConnections', storedConnections);

	let existingConnections = {};

	// Check if storedConnections is not null or undefined
	if (storedConnections) {
		try {
			// Parse storedConnections if it's a valid JSON string
			existingConnections = JSON.parse(storedConnections) || {};
		} catch (error) {
			console.error('Error parsing storedConnections:', error);
			existingConnections = {};
		}
	}

	return existingConnections;
}
