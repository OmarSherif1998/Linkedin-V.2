/** @format */

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../Redux/sllices/userSlice';
import { fetchPosts } from '../../api/posts/postAPI.js';
import { initializeSocket } from '../../Sockets/postSockets.js';
import { useHandlers } from '../../hooks/useHandlers.js';
import LazyLoading from '../util/LazyLoading.jsx';
import InputOption from '../Options/InputOption';
import Post from '../post/Post';
import ImageIcon from '@mui/icons-material/Image';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import PostForm from '../post/PostForm';

function Feed() {
	const user = useSelector(selectUser);
	const { loading, setLoading } = useHandlers();
	const [form, setForm] = useState(false);
	const [newPost, setNewPost] = useState(null);
	const [posts, setPosts] = useState([]);
	const formInputs = [
		{ Icon: ImageIcon, title: 'Media', color: '#70B5F9' },
		{ Icon: EventNoteIcon, title: 'Event', color: '#de5f16' },
		{ Icon: CalendarViewDayIcon, title: 'Write article', color: '#7FC15E' },
	];

	const handleForm = (e) => {
		e.preventDefault();
		setForm(!form);
	};

	useEffect(() => {
		const fetchPostsData = async () => {
			try {
				setLoading(true);
				const data = await fetchPosts();
				//console.log(data);
				if (data.length > 0) {
					setPosts(data);
				}

				setLoading(false);
			} catch (error) {
				console.error('Error fetching posts:', error);
				setLoading(false);
			}
		};

		fetchPostsData();
	}, [setLoading]);

	useEffect(() => {
		const socket = initializeSocket();

		socket.on('PostContent', (msg) => {
			setNewPost({
				...msg,
			});
		});

		return () => {
			socket.off('PostContent'); // Clean up the event listener
		};
	}, [user]);

	useEffect(() => {
		if (newPost) {
			console.log('new Post data', newPost);
			setPosts((prevPosts) => [newPost, ...prevPosts]);
			console.log('new PostS data', posts);
		}
	}, [newPost]);

	return (
		<div className='w-[40%] relative'>
			{form && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
					<PostForm handleClose={handleForm} />
				</div>
			)}

			<div className='z-0 bg-white cursor-pointer py-[2rem] px-[2rem] pb-[1.25rem] rounded-[0.625rem] mb-[1.25rem] shadow-lg border'>
				<div className='flex gap-1'>
					<img
						src={user?.profilePicture}
						alt=''
						className='w-[2rem] h-[2rem] rounded-full'
					/>
					<button
						onClick={handleForm}
						className='flex bg-BgColor border border-gray-500 text-gray-600 w-full rounded-full p-[0.3125rem] cursor-pointer'
					>
						Start a post, try writing with AI
					</button>
				</div>
				<div className='flex py-[1rem] text-center justify-between'>
					{formInputs.map((data, index) => (
						<InputOption
							Icon={data.Icon}
							color={data.color}
							title={data.title}
							key={index}
						/>
					))}
				</div>
			</div>

			{loading ? (
				<div className='flex flex-col'>
					<LazyLoading />
					<LazyLoading />
					<LazyLoading />
				</div>
			) : (
				<div>
					{Array.isArray(posts) ? (
						posts.length === 0 ? (
							<div className='text-center text-gray-500'>
								No updates at this time, please check again later.
							</div>
						) : (
							posts.map((data, index) => (
								<Post key={data._id} data={data} user={user} />
							))
						)
					) : null}
				</div>
			)}
		</div>
	);
}

export default Feed;
