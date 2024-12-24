/** @format */

export function LocalPendingRequests(senderID, receiverID) {
	const storedRequests = localStorage.getItem(`pendingRequests_${senderID}`);
	const existingRequests = storedRequests ? JSON.parse(storedRequests) : [];

	if (!existingRequests.includes(receiverID)) {
		existingRequests.push(receiverID);
	}

	localStorage.setItem(
		`pendingRequests_${senderID}`,
		JSON.stringify(existingRequests)
	);
	localStorage.setItem(`pendingRequests_Expiry_${senderID}`, Date.now());

	return existingRequests;
}
