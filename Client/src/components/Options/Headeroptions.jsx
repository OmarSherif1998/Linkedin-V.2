/** @format */

import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, logout } from '../../Redux/sllices/userSlice';
import { useSelector } from 'react-redux';

function Headeroptions({ avatar, Icon, title }) {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const LogOut = () => {
		dispatch(logout());
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<div className='flex flex-col items-center justify-center mr-5 text-gray-500 cursor-pointer hover:text-black '>
			{Icon && (
				<Icon
					className='object-contain hover:text-black'
					style={{ color: 'gray', fontSize: '2rem' }}
				/>
			)}
			{avatar && (
				<Avatar
					onClick={LogOut}
					className='border border-gray-300 rounded'
					src={user?.profilePicture}
				/>
			)}
			<h3 className='text-xs font-normal'> {title} </h3>
		</div>
	);
}

export default Headeroptions;
