/** @format */

import React, { useEffect, useState } from 'react';
import { acceptRequest, rejectRequest } from '../../api/connectionAPI';

function PendingConnections({ PR }) {
	const [pendingRequests, setPendingRequests] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setPendingRequests(PR); // Set the passed prop to state
		console.log(PR); // Log the passed prop for debugging
	}, [PR]);

	const handleAccept = async (_id, userID) => {
		try {
			const response = await acceptRequest(_id, userID);
			setIsLoading(true); //
			if (response.status === 200) {
				// Update the pending requests state and remove the accepted request
				setPendingRequests((prevRequests) =>
					prevRequests.filter((req) => req._id !== _id)
				);
				setIsLoading(false); //
			}
		} catch (error) {
			console.error('ERROR PROCESSING THE ACCEPT REQUEST', error);
		}
	};
	const handleReject = async (_id, userID) => {
		try {
			const response = await rejectRequest(_id, userID);
			if (response.status === 200) {
				// Update the pending requests state and remove the accepted request
				setPendingRequests((prevRequests) =>
					prevRequests.filter((req) => req._id !== _id)
				);
				setIsLoading(false); //
			}
		} catch (error) {
			console.error('ERROR PROCESSING THE REJECT REQUEST', error);
		}
	};

	return (
		<div className='p-5 text-lg font-semibold bg-white rounded-lg shadow-lg'>
			{pendingRequests.length === 0 ? (
				<section className='flex items-center justify-between'>
					<p className='text-sm font-normal'>No pending invitations</p>
					<button className='p-1 text-gray-500 rounded-md hover:bg-gray-200'>
						Manage
					</button>
				</section>
			) : (
				<div className='flex flex-col gap-4'>
					<h1>Pending Requests ({pendingRequests.length}) :</h1>
					{pendingRequests.map((request) => (
						<div
							key={request._id} // Make sure to use a unique key like `_id`
							className='flex items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-lg'
						>
							<section className='flex items-center gap-5'>
								{' '}
								<img
									src={request.sender.profilePicture}
									alt={`${request.sender.firstName}'s profile`}
									className='w-10 h-10 rounded-full'
								/>
								<div>
									<p className='text-lg font-semibold'>
										{request.sender.firstName} {request.sender.lastName}
									</p>
								</div>
							</section>
							<section className='flex items-center gap-2'>
								<button
									onClick={() => handleAccept(request._id, request.sender.id)}
									className='px-4 border rounded-full text-LinkedInBlue border-LinkedInBlue hover:bg-LinkedInBlue hover:text-white'
								>
									Accept
								</button>
								<button
									onClick={() => handleReject(request._id, request.sender.id)}
									className='px-5 text-red-600 border border-red-600 rounded-full hover:text-white hover:bg-red-600 '
								>
									Reject
								</button>
							</section>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default PendingConnections;
