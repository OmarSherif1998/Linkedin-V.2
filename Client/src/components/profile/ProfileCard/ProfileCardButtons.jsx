/** @format */

import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function ProfileCardButtons({ type, user, currentUser }) {
	return (
		<div className='flex gap-[0.5rem] ml-[1.5rem] text-lg font-semibold'>
			{type === 'Me' ? (
				<div className='flex gap-[0.5rem]'>
					<button className='w-fit h-[2rem] px-5 text-white rounded-full bg-LinkedInBlue hover:bg-blue-900'>
						Open To
					</button>
					<button className='w-fit h-[2rem] px-5 text-LinkedInBlue border-LinkedInBlue border rounded-full hover:bg-gray-100'>
						Add a profile section
					</button>
				</div>
			) : (
				<div className='flex gap-[0.5rem]'>
					{user.connections.includes(currentUser._id) ? null : (
						<button className='flex gap-1 items-center w-fit px-5 h-[2rem] text-white bg-LinkedInBlue border-LinkedInBlue border rounded-full hover:bg-blue-900 '>
							<PersonAddIcon />
							<p>Connect</p>
						</button>
					)}
					<button className='flex gap-1  w-fit px-5 h-[2rem] text-LinkedInBlue border-LinkedInBlue border rounded-full hover:bg-gray-100 '>
						<SendIcon className='transform -rotate-45' />
						<p>Message</p>
					</button>
				</div>
			)}

			<button className='w-[fit] h-[2rem] px-5 text-gray-600 border-gray-600 border rounded-full hover:bg-gray-100 hover:text-gray-900 hover:border-gray-900 hover:border-2'>
				More
			</button>
		</div>
	);
}

export default ProfileCardButtons;
