/** @format */

import React from 'react';

function ActivityComment({ posts, userDetails, postsDate }) {
	return (
		<div className='flex flex-col gap-2 opacity-80'>
			{posts?.length > 0 ? (
				posts.map((data, index) => (
					<div
						key={index}
						className='flex flex-col w-full p-4 border-t border-gray-400'
					>
						<div className='flex items-start gap-2 p-2 '>
							<div className='flex flex-col gap-1'>
								<h3 className='text-xs text-gray-600'>
									{userDetails?.username +
										` commented on a post • ${postsDate[index]} ago`}
								</h3>
							</div>
						</div>
						<p className='ml-12 text-sm'>{data?.content}</p>
						<img src={data?.media} alt='' />
					</div>
				))
			) : (
				<p>No Comments available.</p>
			)}
		</div>
	);
}

export default ActivityComment;
