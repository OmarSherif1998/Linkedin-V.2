/** @format */

import { Avatar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser, logout } from '../../Redux/sllices/userSlice';
import { useSelector } from 'react-redux';
import { useHandlers } from '../../hooks/useHandlers';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import AccountDropdown from './AccountDropdown';
function Headeroptions({ avatar, Icon, title, isSpecial, location }) {
	const { handleNavigateToHome } = useHandlers();
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [dropDown, setDropDown] = useState(false);
	const handleAccountDropDown = () => {
		setDropDown(!dropDown);
	};
	const handleLogout = () => {
		dispatch(logout());
		localStorage.removeItem('token');
		navigate('/');
	};
	return (
		<div className='flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:text-black '>
			<div className='flex '>
				{Icon && (
					<Icon
						onClick={title === 'Home' ? handleNavigateToHome : null}
						style={
							isSpecial
								? { color: '#e6c611', fontSize: '2rem' }
								: location === '/home' && title === 'Home'
								? { color: 'black', fontSize: '2rem' }
								: { color: 'gray', fontSize: '2rem' }
						}
					/>
				)}
			</div>

			{avatar && (
				<Avatar
					onClick={handleAccountDropDown}
					src={user?.profilePicture}
					className='border border-gray-500'
					style={{ height: '2rem', width: '2rem' }}
				/>
			)}
			{title === 'Me' ? (
				<div onClick={handleAccountDropDown} className='flex flex-col'>
					<h3 className='flex items-center ml-3 text-xs font-normal'>
						{title} <ArrowDropDownIcon />
					</h3>
					{dropDown === true ? (
						<AccountDropdown user={user} handleLogout={handleLogout} />
					) : null}
				</div>
			) : (
				<h3
					className={
						location === '/home' && title === 'Home'
							? 'text-xs font-normal border-b-2 border-black w-20 text-center text-black'
							: 'text-xs font-normal '
					}
				>
					{title}{' '}
				</h3>
			)}
		</div>
	);
}

export default Headeroptions;
