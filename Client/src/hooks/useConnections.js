/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { LocalPendingRequests } from '../functions/LocalPendingRequests';
import {
	getConnectionRequests,
	getUserConnections,
} from '../api/connectionAPI';
import {
	addConnections,
	addPendingRequest,
	clearPendingRequests,
	selectConnections,
	selectPendingRequests,
} from '../Redux/sllices/connectionSlice';
import { LocalStorageConnections } from '../functions/LocalStorageConnections';

export function useConnections() {
	const pendingRequests = useSelector(selectPendingRequests);
	const connections = useSelector(selectConnections);
	const dispatch = useDispatch();

	const addUniqueConnections = (localConnection) => {
		const filteredConnections = localConnection.filter((localConn) => {
			// Check if the local connection already exists in Redux's connections array
			//	console.log('connections:', connections);
			return !connections.some((reduxConn) => reduxConn._id === localConn._id);
		});
		return filteredConnections;
	};

	const checkConnections = async (userID) => {
		try {
			const localConnection = LocalStorageConnections(userID);
			// console.log('localConnection', localConnection);
			if (localConnection?.length > 0) {
				const filteredConnections = addUniqueConnections(localConnection);
				//	console.log('filteredConnections', filteredConnections);

				if (filteredConnections?.length > 0) {
					dispatch(addConnections(filteredConnections));
				}
				//dispatch(addConnections(localConnection));
				return localConnection;
			}

			// Fetch from API if no connections in localStorage
			const connectionFromAPI = await getUserConnections(userID);

			localStorage.setItem(
				`connections_${userID}`,
				JSON.stringify(connectionFromAPI) // Store as JSON
			);
			return connectionFromAPI;
		} catch (error) {
			console.error('useConnections ERROR: Error fetching connections:', error);
			return []; // Return empty array in case of error
		}
	};

	const checkLocalStoragePendingRequest = (userID) => {
		const localPendingRequests = localStorage.getItem(
			`pendingRequests_${userID}`
		);
		const timestamp = localStorage.getItem(`pendingRequests_Expiry_${userID}`);

		if (localPendingRequests && timestamp) {
			const currentTime = Date.now();
			const expiryTime = 5 * 60 * 1000; // 5 minutes
			if (currentTime - timestamp < expiryTime) {
				return JSON.parse(localPendingRequests); // Parse if it's a JSON string
			} else {
				// Remove expired data from localStorage
				localStorage.removeItem(`pendingRequests_${userID}`);
				localStorage.removeItem(`pendingRequests_Expiry_${userID}`);
				dispatch(clearPendingRequests());
				return null;
			}
		}
	};

	const fetchPendingRequests = async (userID) => {
		try {
			const requests = await getConnectionRequests(userID);
			if (requests.length > 0) {
				requests.forEach((request) => {
					if (!pendingRequests?.includes(request.receiver)) {
						dispatch(addPendingRequest(request.receiver));
						LocalPendingRequests(userID, request.receiver);
					}
				});
			} else {
				//	console.log('There were no pending requests found.');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return {
		checkLocalStoragePendingRequest,
		fetchPendingRequests,
		checkConnections,
	};
}
