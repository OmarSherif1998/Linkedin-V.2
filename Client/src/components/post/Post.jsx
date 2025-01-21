/** @format */

import React, { forwardRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useHandlers } from '../../hooks/useHandlers';
import { calcDates } from '../../functions/calcDates';
import { AddComment } from '../../api/postAPI.js';
import {
	addPendingRequest,
	selectPendingRequests,
} from '../../Redux/sllices/connectionSlice';
import { sendConnectionRequest } from '../../api/connectionAPI';
import PendingButton from '../Buttons/PendingButton';
import ConnectButton from '../Buttons/ConnectButton';
import { Avatar } from '@mui/material';
import InputOption from '../Options/InputOption';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import RepeatIcon from '@mui/icons-material/Repeat';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import PublicIcon from '@mui/icons-material/Public';
import { LocalPendingRequests } from '../../functions/LocalPendingRequests.js';

const Post = forwardRef(({ postData, user }, ref) => {
	//	console.log(postData);
	const dispatch = useDispatch();
	const pendingRequests = useSelector(selectPendingRequests);
	const [isPending, setIsPending] = useState(false);
	const { loading, setLoading } = useHandlers();
	const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
	const [postComments, setPostComments] = useState([]);
	const [likesCount, setLikesCount] = useState(postData?.likesCount || 0);
	const [commentInput, setCommentInput] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		setPostComments(postData.comments);
		setLikesCount(postData.likesCount);
	}, [postData]);

	useEffect(() => {
		//console.log(user);
		//console.log(pendingRequests?.includes(postData.user));
		if (pendingRequests?.includes(postData.user)) {
			setIsPending(true);
		}
	}, [pendingRequests, postData.user]);

	const handleConnection = async () => {
		try {
			const response = await sendConnectionRequest(user._id, postData.user);
			if (response.status === 200) {
				setIsPending(true);

				dispatch(addPendingRequest(postData.user));
				LocalPendingRequests(user._id, postData.user);
			}
		} catch (error) {
			console.error(
				'CLIENT ERROR: Error sending connection request:',
				error.message
			);
		}
	};

	const routoToProfile = () => {
		setLoading(true);
		if (postData?.user === user?._id) {
			navigate(`/profile`);
		} else {
			navigate(`/VisitedProfile?visitedId=${postData.user}`);
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
			const response = await AddComment(commentInput, user._id, postData._id);

			//	console.log('Comment response:', response); // Check the response

			if (response) {
				setCommentInput(''); // This should clear the input
				setPostComments((prevComments) => [response, ...prevComments]);
				postData.commentsCount++;
				setIsCommentSectionOpen(!isCommentSectionOpen);
			}
		} catch (error) {
			console.error(error); // Log or handle the error if needed
		}
	};

	const filteredComments = postComments.filter(
		(comment) => comment.post === postData._id
	);
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
				<Avatar src={postData?.profilePicture} />
				<div className='flex flex-col justify-start'>
					<h2
						onClick={routoToProfile}
						className='text-[0.9375rem] text-black font-normal cursor-pointer hover:underline hover:text-blue-600'
					>
						{postData?.username}
					</h2>
					<p
						onClick={routoToProfile}
						className='text-[0.65rem] text-gray-500 cursor-pointer'
					>
						{postData?.bio}
					</p>
					<time className='text-[0.65rem] text-gray-500 flex gap-1 items-center'>
						{postData?.createdAt != null
							? calcDates(postData?.createdAt)
							: null}{' '}
						ago • <PublicIcon style={{ fontSize: '0.9rem' }} />
					</time>
				</div>
				{postData?.user === user?._id ? null : user.connections.includes(
						postData.user
				  ) ? null : isPending ? (
					<PendingButton />
				) : (
					<ConnectButton Connection={handleConnection} />
				)}
			</section>

			<section className='mt-5 break-words'>
				<p className='ml-[2rem] pb-5'>{postData.content}</p>
			</section>

			{postData?.media.length > 0 ? (
				<figure className='flex justify-center m-auto p-[1rem] max-h-[30rem]  object-cover border border-gray-100 cursor-pointer'>
					<img
						loading='lazy'
						src={postData?.media}
						alt=''
						className='max-h-[20rem]'
					/>
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
							{postData.commentsCount > 0 && (
								<>
									<span className='text-blue-600'>
										{postData.commentsCount}
									</span>
									<span className='text-gray-500'> Comments</span>
								</>
							)}
						</button>
						<div className='flex gap-1 text-sm font-medium text-gray-700'>
							{postData.sharesCount > 0 && (
								<>
									<span className='text-blue-600'>{postData.sharesCount}</span>
									<span className='text-gray-500'> Shares</span>
								</>
							)}
						</div>
					</section>
				</div>

				<nav className='flex border-t border-b border-gray-300 justify-evenly'>
					<InputOption
						postID={postData._id}
						userID={user?._id}
						LikedBy={postData.likedBy}
						likeCount={postData.likesCount}
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
