/** @format */

import React, { useEffect, useState } from 'react';
import { getUserComments, getUserPosts } from '../../api/postAPI.js';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { calcDates } from '../../functions/calcDates.js';
import ActivityPost from './Activity/ActivityPost.jsx';
import ActivityComment from './Activity/ActivityComment.jsx';

function Activity({ userDetails }) {
	const [isPostActive, setIsPostActive] = useState(true);
	const [isCommentActive, setIsCommentActive] = useState(false);
	const [posts, setPosts] = useState();
	const [comments, setComments] = useState();
	const [postsDate, setPostsDate] = useState({});

	useEffect(() => {
		const getPostsData = async () => {
			try {
				const res = await getUserPosts(userDetails._id);
				setPosts(res);
				setPostsDate(calcDates(res));
			} catch (error) {
				console.error(error);
			}
		};

		const getCommentsData = async () => {
			try {
				const res = await getUserComments(userDetails._id); // Assuming you have a similar function to get comments
				console.log(res);
				setComments(res); // Make sure to define setComments
			} catch (error) {
				console.error(error);
			}
		};

		// Improved if/else structure
		if (userDetails.postsCount > 0) {
			getPostsData(); // Fetch posts if posts exist
		}

		if (userDetails.commentsCount > 0) {
			getCommentsData(); // Fetch comments if comments exist
		}

		// If neither posts nor comments exist, you can handle it here if needed
	}, []);

	// Toggle the active state when the button is clicked
	const togglePostActive = () => {
		if (isPostActive) return;
		setIsPostActive(!isPostActive);
		setIsCommentActive(!isCommentActive);
	};
	const toggleCommentActive = () => {
		if (isCommentActive) return;
		setIsCommentActive(!isCommentActive);
		setIsPostActive(!isPostActive);
	};

	// Define classes for active and inactive states
	const PostbuttonClasses = isPostActive
		? 'px-4 border border-red-900 rounded-full w-fit bg-green-700 text-white'
		: 'px-4 border border-red-900 rounded-full w-fit text-red-900 hover:bg-green-700 hover:text-white';
	const CommentbuttonClasses = isCommentActive
		? 'px-4 border border-red-900 rounded-full w-fit bg-green-700 text-white'
		: 'px-4 border border-red-900 rounded-full w-fit text-red-900 hover:bg-green-700 hover:text-white';
	//console.log(userDetails);
	return (
		<div>
			<div className='flex flex-col gap-3 p-2 bg-white border border-b-0 border-gray-400 rounded-t-lg shadow-xl'>
				<div className='flex flex-col'>
					<h1 className='text-lg font-semibold text-black'>Activity</h1>
					<span className='text-xs'>
						{userDetails?.connectionCount + ' followers'}
					</span>
				</div>
				<div className='flex gap-2'>
					<button className={PostbuttonClasses} onClick={togglePostActive}>
						Posts
					</button>
					<button
						className={CommentbuttonClasses}
						onClick={toggleCommentActive}
					>
						Comments
					</button>
				</div>
				{isPostActive && (
					<ActivityPost
						posts={posts}
						userDetails={userDetails}
						postsDate={postsDate}
					/>
				)}
				{isCommentActive && (
					<ActivityComment
						posts={comments}
						userDetails={userDetails}
						postsDate={postsDate}
					/>
				)}
			</div>
			<div className='flex items-center justify-center gap-1 py-2 text-gray-800 bg-white border border-gray-400 rounded-b-lg shadow-xl hover:bg-gray-100'>
				<button>
					Show all posts <ArrowRightAltIcon />{' '}
				</button>
			</div>
		</div>
	);
}

export default Activity;
