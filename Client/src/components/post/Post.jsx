/** @format */

import React, { forwardRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHandlers } from '../../hooks/useHandlers';
import { calcDates } from '../../functions/calcDates';
import { AddComment } from '../../api/posts/postAPI';
import { Avatar } from '@mui/material';
import InputOption from '../Options/InputOption';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import RepeatIcon from '@mui/icons-material/Repeat';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';

const Post = forwardRef(({ data, user }, ref) => {
	//	console.log(data);
	const { loading, setLoading } = useHandlers();
	const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
	const [postComments, setPostComments] = useState([]);
	const [likesCount, setLikesCount] = useState(data?.likesCount || 0);
	const [commentInput, setCommentInput] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setPostComments(data.comments);
		setLikesCount(data.likesCount);
	}, [data]);

	const routoToProfile = () => {
		setLoading(true);
		if (data?.user === user?._id) {
			navigate(`/profile`);
		} else {
			navigate(`/VisitedProfile?visitedId=${data.user}`);
		}

		setLoading(false);
	};
	const handleLikeUpdate = (newLikesCount) => {
		setLikesCount(newLikesCount);
	};
	const handleCommentUpdate = () => {
		//console.log('comment', isCommentSectionOpen);
		setIsCommentSectionOpen(!isCommentSectionOpen);
	};
	const handleCommentInput = (e) => {
		setCommentInput(e.target.value);
	};
	const handleComment = async (e) => {
		e.preventDefault();
		try {
			const response = await AddComment(commentInput, user._id, data._id);

			//	console.log('Comment response:', response); // Check the response

			if (response) {
				setCommentInput(''); // This should clear the input
				setPostComments((prevComments) => [response, ...prevComments]);
				data.commentsCount++;
				setIsCommentSectionOpen(!isCommentSectionOpen);
			}
		} catch (error) {
			console.error(error); // Log or handle the error if needed
		}
	};
	const filteredComments = postComments.filter(
		(comment) => comment.post === data._id
	);
	//console.log(filteredComments);
	return (
		<article
			ref={ref}
			className='bg-white p-[0.9375rem] mb-[0.9375rem] rounded-[0.625rem] shadow-2xl border-gray-200 border'
		>
			<header className='flex justify-end w-full border-gray-200 border-b-[0.1rem] mb-[1rem]'>
				<button className='text-gray-500 hover:text-black'>
					<MoreHorizIcon className='cursor-pointer' />
				</button>
				<button className='text-black'>
					<CloseIcon className='cursor-pointer' />
				</button>
			</header>

			<section className='flex mb-[0.625rem] gap-2 items-center'>
				<Avatar src={data?.profilePicture} />
				<div className='flex flex-col justify-start'>
					<h2
						onClick={routoToProfile}
						className='text-[0.9375rem] text-black font-normal cursor-pointer hover:underline hover:text-blue-600'
					>
						{data?.username}
					</h2>
					<p
						onClick={routoToProfile}
						className='text-[0.65rem] text-gray-500 cursor-pointer'
					>
						{data?.bio}
					</p>
					<time className='text-[0.65rem] text-gray-500 flex gap-1 items-center'>
						{data?.createdAt != null ? calcDates(data?.createdAt) : null} ago •{' '}
						<PublicIcon style={{ fontSize: '0.9rem' }} />
					</time>
				</div>
				{data?.user === user?._id ? null : (
					<aside className='ml-auto'>
						<button className='flex items-center gap-2 font-medium text-blue-500 cursor-pointer hover:text-postButtonColor group hover:bg-blue-100 hover:bg-opacity-50 hover:rounded-xl px-[0.5rem]'>
							<PersonAddIcon className='text-blue-500 group-hover:text-postButtonColor' />
							<span className='group-hover:text-postButtonColor'>Connect</span>
						</button>
					</aside>
				)}
			</section>

			<section className='mt-5 break-words'>
				<p className='ml-[2rem] pb-5'>{data.content}</p>
			</section>

			{data?.media.length > 0 ? (
				<figure className='flex justify-center m-auto p-[1rem] max-h-[30rem]  object-cover border border-gray-100 cursor-pointer'>
					<img src={data?.media} alt='' className='max-h-[20rem]' />
				</figure>
			) : null}

			<footer>
				<div className='flex justify-end gap-1 px-2 '>
					{' '}
					<section className='flex gap-1 mr-auto text-sm font-medium text-gray-700'>
						{likesCount > 0 && (
							<>
								<span className='text-blue-600'>{likesCount}</span>
								<span className='text-gray-500'> Likes</span>
							</>
						)}
					</section>
					<section>
						<button
							onClick={handleCommentUpdate}
							className='flex gap-1 text-sm font-medium text-gray-700'
						>
							{data.commentsCount > 0 && (
								<>
									<span className='text-blue-600'>{data.commentsCount}</span>
									<span className='text-gray-500'> Comments</span>
								</>
							)}
						</button>
						<div className='flex gap-1 text-sm font-medium text-gray-700'>
							{data.sharesCount > 0 && (
								<>
									<span className='text-blue-600'>{data.sharesCount}</span>
									<span className='text-gray-500'> Shares</span>
								</>
							)}
						</div>
					</section>
				</div>

				<nav className='flex border-t border-b border-gray-300 justify-evenly'>
					<InputOption
						postID={data._id}
						userID={user?._id}
						LikedBy={data.likedBy}
						likeCount={data.likesCount}
						Icon={ThumbUpIcon}
						title='Like'
						onLikeUpdate={handleLikeUpdate}
					/>
					<InputOption
						onCommentUpdate={handleCommentUpdate}
						Icon={CommentIcon}
						title='Comment'
					/>
					<InputOption Icon={RepeatIcon} title='Repost' />
					<InputOption Icon={SendIcon} title='Send' />
				</nav>

				<section className='mt-5'>
					<div className='flex gap-1'>
						<img
							src={user?.profilePicture}
							alt=''
							className='rounded-full h-[2rem] w-[2rem] '
						/>
						<input
							type='text'
							placeholder='Add a comment...'
							className='w-full p-1 pl-4 border border-gray-400 rounded-full cursor-pointer active:border-2'
							onChange={handleCommentInput}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									handleComment(e);
								}
							}}
							value={commentInput}
						/>
					</div>
				</section>
				{isCommentSectionOpen ? (
					<section className='p-4 bg-white rounded-md shadow-sm'>
						{filteredComments.length > 0 ? (
							filteredComments.map((comment, index) => (
								<div
									key={comment._id}
									className='flex items-start gap-2 p-3 mt-4 shadow-md'
								>
									<div className='flex flex-col'>
										<button className='flex items-center gap-2 text-sm font-semibold hover:underline'>
											<img
												src={comment.user.profilePicture}
												alt='Profile'
												className='object-cover flex w-[1.5rem] h-[1.5rem] rounded-full'
											/>
											<p>
												{comment.user.firstName + ' ' + comment.user.lastName}
											</p>
										</button>

										<p className='mt-1 ml-8 text-sm text-gray-700'>
											{comment.content}
										</p>
										<section className='flex gap-2 ml-5'>
											<div className='flex items-center gap-2 mt-1 text-sm text-gray-500'>
												<button className='hover:text-blue-600'>Like</button>
												<button>Reply</button>
												<p className='ml-auto text-xs text-gray-500'>
													{calcDates(comment.createdAt) + ' ago'}
												</p>
											</div>
										</section>
									</div>
								</div>
							))
						) : (
							<p className='text-center text-gray-500'>
								There's no comments on this post yet
							</p>
						)}
					</section>
				) : null}
			</footer>
		</article>
	);
});
export default Post;
