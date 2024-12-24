/** @format */

import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import NotifyNetwork from './NotifyNetwork';

function FormNav({ closeForm, Title, formVersion }) {
	return (
		<div>
			<div className='flex items-center justify-between pb-2 border-b border-gray-300'>
				<h1 className='text-lg font-semibold '>{Title}</h1>
				<CloseIcon
					className='p-1 m-1 rounded-full cursor-pointer hover:bg-gray-200'
					onClick={closeForm}
					fontSize='large'
				/>{' '}
			</div>
			{Title === 'Add a new experience' || Title === 'Add Education' ? (
				<section>
					<NotifyNetwork formVersion={formVersion} />
				</section>
			) : null}
			<span className='flex gap-1 pt-2 text-xs font-thin text-gray-400'>
				<p className='text-red-500'>*</p> Indicates required
			</span>
		</div>
	);
}

export default FormNav;
