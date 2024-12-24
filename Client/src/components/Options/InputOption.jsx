/** @format */

import React, { useEffect, useState } from 'react';
import { LikePost } from '../../api/postAPI.js';

function InputOption({
	Icon,
	title,
	color,
	postID,
	userID,
	LikedBy,
	likeCount,
	onLikeUpdate,
	onCommentUpdate,
}) {
	// Define the classes for each option
	const colorClasses = {
		Like: ' hover:text-likeColor',
		Comment: ' hover:text-orange-500',
		Repost: ' hover:text-green-500',
		Send: ' hover:text-black',
	};

	const token = localStorage.getItem('token');
	// Fallback to an empty string if title does not match any case
	const colorClass = colorClasses[title] || '';
	const [likes, setLikes] = useState(likeCount);
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		const postIsLiked = LikedBy?.includes(userID);

		// Update the local state based on the response
		setIsLiked(postIsLiked);
		setLikes(0);
	}, [likeCount]);

	const handleLike = async () => {
		try {
			const response = await LikePost(postID, userID, token);
			// Check if the response indicates the post is liked
			console.log('id', userID);
			console.log('response', response);
			const postIsLiked = response?.data.likedBy.includes(userID);

			// Update the local state based on the response
			setIsLiked(postIsLiked);
			if (postIsLiked === true) {
				setLikes((prev) => prev + 1);
			} else {
				setLikes((prev) => prev - 1);
			}
			if (onLikeUpdate) {
				onLikeUpdate(postIsLiked ? likes + 1 : likes - 1);
			}
			console.log('response: ', response);
		} catch (error) {
			console.error(
				'InputOptions ERROR. There was an error handling like :  ',
				error
			);
		}
	};

	return (
		<div
			className={`flex gap-1 items-center cursor-pointer text-gray-600 ${colorClass} cursor-pointer hover:bg-gray-100 rounded-lg p-2 ${
				title === 'Like' && isLiked ? ' text-likeColor' : ''
			}`}
			onClick={
				title === 'Like'
					? handleLike
					: title === 'Comment'
					? onCommentUpdate
					: null
			}
		>
			<Icon style={{ color: color }} />
			<h4>{title}</h4>
		</div>
	);
}

export default InputOption;
