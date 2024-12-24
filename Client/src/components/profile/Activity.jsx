/** @format */

import React, { useState } from 'react';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ActivityPost from './Activity/ActivityPost.jsx';
import ActivityComment from './Activity/ActivityComment.jsx';

function Activity({ userDetails }) {
	const [isPostActive, setIsPostActive] = useState(true);
	const [isCommentActive, setIsCommentActive] = useState(false);
	console.log('UD: ', userDetails);
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
	return (
		<div>
			<div className='flex flex-col gap-3 p-4 bg-white border border-b-0 border-gray-400 rounded-t-lg shadow-xl'>
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
					<ActivityPost posts={userDetails.posts} userDetails={userDetails} />
				)}
				{isCommentActive && (
					<ActivityComment
						comments={userDetails.comments}
						userDetails={userDetails}
					/>
				)}
			</div>
			<div className='flex items-center justify-center gap-1 py-2 text-gray-800 bg-white border border-gray-400 rounded-b-lg shadow-xl hover:bg-gray-100'>
				{isPostActive ? (
					<button>
						Show all posts <ArrowRightAltIcon />{' '}
					</button>
				) : (
					<button>
						Show all comments <ArrowRightAltIcon />{' '}
					</button>
				)}
			</div>
		</div>
	);
}

export default Activity;
