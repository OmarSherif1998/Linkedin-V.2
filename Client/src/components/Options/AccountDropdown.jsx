/** @format */
import { useNavigate } from 'react-router-dom';
const AccountDropdown = ({ title, user, handleLogout }) => {
	const navigate = useNavigate();
	const handleNavigateToHome = () => {
		navigate('/profile');
	};
	return (
		<div className='relative'>
			<h3 className='flex items-center ml-3 text-xs font-normal cursor-pointer'>
				{title}
			</h3>

			<ul className='absolute right-0 mt-2 w-[14rem] bg-white border  border-gray-300 rounded-lg rounded-t-none shadow-lg z-10'>
				<div className='p-4'>
					<div className='flex items-center gap-2'>
						<img
							src={user?.profilePicture}
							alt=''
							className='w-10 h-10 border border-gray-300 rounded-full'
						/>
						<div>
							<h1 className='font-semibold'>
								{user?.firstName + ' ' + user?.lastName}
							</h1>
							<p className='text-sm text-gray-600'>{user?.bio}</p>
						</div>
					</div>
					<button
						onClick={handleNavigateToHome}
						className='w-full px-4 mt-2 p-[0.1rem] text-xs font-semibold border rounded-full border-LinkedInBlue text-LinkedInBlue hover:bg-LinkedInBlue hover:text-white'
					>
						View Profile
					</button>
				</div>
				<hr />
				<li className='p-3 text-sm cursor-pointer hover:bg-gray-100'>
					Account
				</li>
				<li className='p-3 text-sm cursor-pointer hover:bg-gray-100'>
					Settings & Privacy
				</li>
				<li className='p-3 text-sm cursor-pointer hover:bg-gray-100'>Help</li>
				<li className='p-3 text-sm cursor-pointer hover:bg-gray-100'>
					Language
				</li>
				<hr />
				<li
					className='p-3 text-sm cursor-pointer hover:bg-gray-100'
					onClick={handleLogout}
				>
					Sign Out
				</li>
			</ul>
		</div>
	);
};

export default AccountDropdown;
