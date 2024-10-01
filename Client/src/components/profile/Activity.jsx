/** @format */

import React, { useEffect, useState } from 'react';
import { getUserPosts } from '../../api/postAPI.js';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { calcDates } from '../../functions/calcDates.js';

function Activity({ userDetails }) {
	const [isPostActive, setIsPostActive] = useState(true);
	const [isCommentActive, setIsCommentActive] = useState(false);
	const [posts, setPosts] = useState();
	const [postsDate, setPostsDate] = useState({});

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await getUserPosts(userDetails._id);

				//	console.log('res: ', res);
				setPosts(res);
				setPostsDate(calcDates(res));
			} catch (error) {
				console.log(console.error(error));
			}
		};
		getData();
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
	console.log(userDetails);
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
					<div className='flex flex-col gap-2 opacity-80'>
						{posts?.length > 0 ? (
							posts.map((data, index) => (
								<div
									key={index}
									className='flex flex-col w-full p-4 border-t border-gray-400'
								>
									<div className='flex items-start gap-2 p-2 '>
										{/* <img
										src={userDetails?.profilePicture}
										alt=''
										className='w-12 h-12 rounded-full'
									/> */}
										<div className='flex flex-col gap-1'>
											<h3 className='text-xs text-gray-600'>
												{userDetails?.username +
													` posted this • ${postsDate[index]} ago`}
											</h3>
										</div>
									</div>
									<p className='ml-12 text-sm'>{data?.content}</p>
									<img src={data?.media} alt='' />
								</div>
							))
						) : (
							<p>No posts available.</p>
						)}
					</div>
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
