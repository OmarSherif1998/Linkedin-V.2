/** @format */

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
function SearchButton() {
	return (
		<nav className='flex items-center justify-between gap-2 px-2'>
			<SearchIcon className='cursor-pointer' />
			<input
				type='text'
				placeholder='Search messages'
				className='w-full p-1 bg-gray-200 rounded-lg'
			/>
			<TuneIcon className='cursor-pointer' />
		</nav>
	);
}

export default SearchButton;
