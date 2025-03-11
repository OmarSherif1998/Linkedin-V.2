/** @format */

import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Headeroptions from '../Options/Headeroptions';
import linkedinSquare from '../../images/icons8-linkedin-96.png';
import { useHandlers } from '../../hooks/useHandlers';
import { useLocation } from 'react-router-dom';
import { headerInputs, PreumiumInput } from '../../staticData/HeaderData';
function Header() {
	const { handleNavigateToHome } = useHandlers();
	const location = useLocation();

	return (
		<div
			className='sticky top-0 flex mb-6 bg-white border-b border-light-gray w-full z-[999] items-center h-[4rem] 
    px-4 sm:px-6 md:px-8'
		>
			<div className='flex items-center mr-auto'>
				<button onClick={handleNavigateToHome}>
					<img
						src={linkedinSquare}
						alt='linkedin logo'
						className='object-cover w-[2.8rem]'
					/>
				</button>
				<div className='hidden sm:flex items-center w-full sm:w-[20rem] px-2 bg-[#eef3f8] rounded-md py-2 text-gray-600'>
					<SearchIcon className='text-gray-500' />
					<input
						name='search'
						type='text'
						placeholder='Search'
						className='w-full ml-2 text-sm bg-transparent border-none outline-none'
					/>
				</div>
			</div>
			{/* <div className='flex justify-between gap-2'>
				{headerInputs.map((data, index) => (
					<Headeroptions
						key={index}
						Icon={data.Icon}
						title={data.title}
						avatar={data.avatar}
						location={location.pathname}
					/>
				))}
				<div className='flex gap-3 pl-2 border-l border-gray-300 '>
					{PreumiumInput.map((data, index) => (
						<Headeroptions
							key={index}
							Icon={data.Icon}
							title={data.title}
							isDropdown={data.isDropdown}
							isSpecial={data.isSpecial}
						/>
					))}
				</div>
			</div> */}
		</div>
	);
}

export default Header;
