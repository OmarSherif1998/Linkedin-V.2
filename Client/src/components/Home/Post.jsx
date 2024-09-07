/** @format */

import React, { forwardRef } from 'react';
import InputOption from '../Options/InputOption';
import { Avatar } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import RepeatIcon from '@mui/icons-material/Repeat';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
const Post = forwardRef(
	({ name, bio, postTextBody, photoURL, postPictureUrl }, ref) => {
		console.log(name);
		return (
			<div
				ref={ref}
				className='bg-white p-[0.9375rem] mb-[0.9375rem] rounded-[0.625rem]  shadow-2xl border-gray-200 border  '
			>
				<div className='flex justify-end w-full border-gray-200 border-b-[0.1rem] mb-[1rem] '>
					<MoreHorizIcon className='text-gray-500 cursor-pointer hover:text-black ' />
					<CloseIcon className='text-black cursor-pointer' />
				</div>
				<div className='flex mb-[0.625rem]  '>
					<Avatar src={photoURL} />
					<div className='ml-[0.625rem]'>
						<h2 className='text-[0.9375rem] text-black font-normal'>{name}</h2>
						<p className='text-[0.75rem] text-gray-500'>{bio}</p>
					</div>
					<div className='flex items-center gap-2 ml-auto font-medium text-blue-500   cursor-pointer hover:text-postButtonColor group hover:bg-blue-100 hover:bg-opacity-50 hover:rounded-xl px-[0.5rem]'>
						<PersonAddIcon className='ml-auto text-blue-500 group-hover:text-postButtonColor' />
						<p className='group-hover:text-postButtonColor'>Connect</p>
					</div>
				</div>

				<div className='break-words'>
					<p className='ml-[4.375rem]'>{postTextBody}</p>
				</div>

				{postPictureUrl ? (
					<img src={postPictureUrl} alt='' className='m-auto p-[1rem]' />
				) : null}

				<div className='flex justify-evenly mt-[2rem]'>
					<InputOption Icon={ThumbUpIcon} title='Like' />
					<InputOption Icon={CommentIcon} title='Comment' />
					<InputOption Icon={RepeatIcon} title='Repost' />
					<InputOption Icon={SendIcon} title='Send' />
				</div>
			</div>
		);
	}
);
export default Post;
