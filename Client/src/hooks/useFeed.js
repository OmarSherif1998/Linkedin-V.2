/** @format */

import { useDispatch, useSelector } from 'react-redux';
import { getConnectionRequests } from '../api/connection';
import {
	addPendingRequest,
	clearPendingRequests,
	selectConnection,
} from '../Redux/sllices/connectionSlice';
import { LocalPendingRequests } from '../functions/LocalPendingRequests';

export function useFeed() {
	const pendingRequests = useSelector(selectConnection);
	const dispatch = useDispatch();

	const checkLocalStoragePendingRequest = (userID) => {
		const pendingRequests = localStorage.getItem(`pendingRequests_${userID}`);
		const timestamp = localStorage.getItem(`pendingRequests_Expiry_${userID}`);

		if (pendingRequests && timestamp) {
			const currentTime = Date.now();
			const expiryTime = 5 * 60 * 1000;
			if (currentTime - timestamp < expiryTime) {
				return pendingRequests;
			} else {
				// Remove expired data from localStorage
				localStorage.removeItem(`pendingRequests_${userID}`);
				localStorage.removeItem(`pendingRequests_expiry_${userID}`);
				dispatch(clearPendingRequests());
				return null;
			}
		}
	};

	const fetchPendingRequests = async (userID) => {
		try {
			//console.log(userID);
			// Fetch connection requests for the current user
			const requests = await getConnectionRequests(userID);
			if (requests.length > 0) {
				// If there are requests, process each one
				requests.forEach((request) => {
					// Dispatch action to add each new pending request
					if (!pendingRequests?.includes(request.receiver)) {
						dispatch(addPendingRequest(request.receiver));

						// Use the LocalPendingRequests function to handle localStorage logic
						const updatedRequests = LocalPendingRequests(
							userID,
							request.receiver
						);
						console.log('Updated Requests in localStorage:', updatedRequests);
					}
				});
			} else {
				console.log('There were no pending requests found.');
			}
			console.log('pendingRequests:', pendingRequests);
		} catch (error) {
			// Log any errors encountered during the fetching process
			console.error(error);
		}
	};

	return { checkLocalStoragePendingRequest, fetchPendingRequests };
}
