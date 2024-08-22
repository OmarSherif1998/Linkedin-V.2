/** @format */

import React, { useEffect, useState } from 'react';
//import FlipMove from 'react-flip-move';
//import { useSelector } from 'react-redux';
//import { selectUser } from '../features/userSlice';
import InputOption from '../components/InputOption';
import Post from '../components/Post';
import image from '../images/couch.png';
import CreateIcon from '@mui/icons-material/Create';
import ImageIcon from '@mui/icons-material/Image';
//import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import { Avatar } from '@mui/material';

function Feed() {
	//const user = useSelector(selectUser);
	const [input, setInput] = useState('');
	const [posts, setPosts] = useState([]);

	console.log(posts);
	useEffect(() => {
		setPosts([
			{
				name: 'Omar Sherif',
				bio: 'ttttt',
				postTextBody: 'uuuuu',
				photoUrl: '',
			},
			{
				name: 'Omar Sherif',
				bio: 'ttttt',
				postTextBody: 'uuuuu',
				photoUrl: '',
			},
		]);
	}, []);
	const user = {
		displayName: 'Omar Sherif',
		email: 'omar@example.com',
		bio: 'Software Engineer',
	};
	const formInputs = [
		{ Icon: ImageIcon, title: 'Media', color: '#70B5F9' },
		{ Icon: EventNoteIcon, title: 'Event', color: '#de5f16' },
		{ Icon: CalendarViewDayIcon, title: 'Write article', color: '#7FC15E' },
	];
	return (
		<div className='w-[35%]'>
			<div className='  bg-white  p-[0.625rem] px-[2rem] pb-[1.25rem] rounded-[0.625rem] mb-[1.25rem]  shadow-lg border'>
				<div className='flex gap-[1rem] items-center'>
					{' '}
					<Avatar src={user.photoURL} className=''>
						{user.displayName[0]}
					</Avatar>
					<div className='flex border border-light-gray rounded-full p-[0.625rem] text-gray-600 pl-[0.9375rem] w-full'>
						<CreateIcon />
						<form>
							<input
								className='border-none rounded-full p-[0.3125rem] flex-1 ml-[0.625rem] outline-none font-semibold'
								value={input}
								onChange={(e) => setInput(e.target.value)}
								type='text'
							/>
						</form>
					</div>
				</div>
				<div className='flex  py-[1rem] text-center justify-between '>
					{formInputs.map((data, index) => {
						return (
							<InputOption
								Icon={data.Icon}
								color={data.color}
								title={data.title}
								key={index}
							/>
						);
					})}
				</div>
			</div>

			{posts.map(({ id, name, bio, postTextBody, photoUrl }) => (
				<Post
					key={id}
					name={name}
					bio={bio}
					postTextBody={postTextBody}
					postPictureUrl={image}
					photoURL={photoUrl}
				/>
			))}
		</div>
	);
}

export default Feed;

// useEffect(() => {
// 	db.collection('posts')
// 		.orderBy('timestamp', 'desc')
// 		.onSnapshot((snapshot) =>
// 			setPosts(
// 				snapshot.docs.map((doc) => ({
// 					id: doc.id,
// 					data: doc.data(),
// 				}))
// 			)
// 		);
// }, []);

// const sendPost = (e) => {
// 	e.preventDefault();
// 	if (input !== '') {
// 		db.collection('posts').add({
// 			name: user.displayName,
// 			bio: user.email,
// 			message: input,
// 			photoUrl: user.photoURL || '',
// 			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
// 		});
// 	}

// 	setInput('');
// };
