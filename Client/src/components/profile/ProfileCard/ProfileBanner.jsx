/** @format */

import React, { useState } from 'react';
import PicForm from '../PicForm';
import { useHandlers } from '../../../hooks/useHandlers';
import coverPic from '../../../images/coverPic.jpg';
function ProfileBanner({ coverPicture, profilePicture, currentUserID, type }) {
	const { handleChangePic, isPicForm } = useHandlers(); // It was originally placed in ProfileCard
	const [screenSize, setScreenSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});
	console.log(screenSize);
	return (
		<div className='relative'>
			<img
				src={coverPicture ? coverPicture : coverPic}
				alt='coverPicture'
				className='w-full h-auto rounded-t-md'
			/>

			<img
				src={profilePicture}
				alt='profilePicture'
				className={`absolute  cursor-pointer top-[5.5rem]
					 left-[7rem] lg:top-[7rem]
					  2xl:top-[6rem]  2xl:size-[15rem]
					  transform -translate-x-[6rem]
					 translate-y-[.2rem] size-[10rem]  object-cover border-[0.3rem]
					  border-white rounded-full z-30`}
				onClick={type === 'Me' ? handleChangePic : undefined}
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
