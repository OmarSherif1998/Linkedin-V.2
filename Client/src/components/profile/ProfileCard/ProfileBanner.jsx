/** @format */

import React, { useEffect } from 'react';
import PicForm from '../PicForm';
import { useHandlers } from '../../../hooks/useHandlers';

function ProfileBanner({ coverPicture, profilePicture, currentUserID }) {
	const { handleChangePic, isPicForm } = useHandlers(); // It was originally placed in ProfileCard
	console.log(typeof handleChangePic); // It should log 'function'

	return (
		<div className='relative'>
			<img
				src={coverPicture}
				alt='coverPicture'
				className='w-full h-auto rounded-t-xl'
			/>

			<img
				// {type === 'Me' ? handleChangePic : undefined}
				src={profilePicture}
				alt='profilePicture'
				className='  absolute bg-white cursor-pointer top-[4rem] left-[7rem] 2xl:top-[9rem] transform -translate-x-[6rem] translate-y-[.2rem] size-[10rem] 2xl:size-[15rem] object-cover border-[0.3rem] border-white rounded-full z-30'
				onClick={handleChangePic}
			/>

			{isPicForm && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
					<PicForm
						handleChangePic={handleChangePic}
						currentUserID={currentUserID}
						profilePicture={profilePicture}
					/>
				</div>
			)}
		</div>
	);
}

export default ProfileBanner;
