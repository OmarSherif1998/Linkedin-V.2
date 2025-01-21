/** @format */

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

function ProfileInfoHeader({
	type,
	firstName,
	lastName,
	username,
	openDetailsForm,
}) {
	return (
		<div className='flex justify-between '>
			<div className='flex items-center gap-2 '>
				<h1 className='text-2xl font-semibold truncate'>
					{type === 'Me' ? `${firstName} ${lastName}` : username}
				</h1>
				<VerifiedUserOutlinedIcon />
			</div>
			{type === 'Me' ? (
				<div
					onClick={openDetailsForm}
					className='flex p-1 border-white rounded-full cursor-pointer hover:bg-gray-100'
				>
					<EditOutlinedIcon sx={{ color: 'gray' }} fontSize='medium' />
				</div>
			) : null}
		</div>
	);
}

export default ProfileInfoHeader;
