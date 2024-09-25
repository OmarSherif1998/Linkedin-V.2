/** @format */

import React from 'react';

function LazyLoading() {
	return (
		<div className='flex flex-col p-4 space-y-4'>
			{/* Skeleton for a post */}
			<div className='w-full p-4 bg-white rounded-lg shadow-lg animate-pulse'>
				{/* User info skeleton */}
				<div className='flex items-center mb-4 space-x-4'>
					<div className='w-12 h-12 bg-gray-300 rounded-full'></div>
					<div className='flex flex-col space-y-2'>
						<div className='w-32 h-4 bg-gray-300 rounded'></div>
						<div className='w-20 h-3 bg-gray-300 rounded'></div>
					</div>
				</div>

				{/* Content skeleton */}
				<div className='space-y-2'>
					<div className='w-full h-4 bg-gray-300 rounded'></div>
					<div className='w-full h-4 bg-gray-300 rounded'></div>
					<div className='w-3/4 h-4 bg-gray-300 rounded'></div>
				</div>

				{/* Action buttons skeleton */}
				<div className='flex items-center mt-4 space-x-4'>
					<div className='w-10 h-10 bg-gray-300 rounded-full'></div>
					<div className='w-10 h-10 bg-gray-300 rounded-full'></div>
					<div className='w-10 h-10 bg-gray-300 rounded-full'></div>
				</div>
			</div>
		</div>
	);
}

export default LazyLoading;
