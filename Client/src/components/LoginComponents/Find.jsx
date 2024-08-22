/** @format */

import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InputOption from '../InputOption';
import person3 from '../../images/person3.jpg';

const BtnList = ({ data }) => {
	return data.map((item, index) => (
		<button
			key={index}
			className='flex w-[20.625rem] h-[3.125rem] justify-between items-center px-[1.25rem] bg-[#eae6df] border-none hover:bg-[#c7d5ea] hover:text-white cursor-pointer'
		>
			<p className='pt-[0.5rem] text-base italic font-medium font-system'>
				{item}
			</p>
			<InputOption Icon={ArrowForwardIosIcon} />
		</button>
	));
};

function Find() {
	const btnData = [
		'Find a wroker or classmate',
		'Find a new job',
		'Find a course or training',
	];
	return (
		<div className='flex flex-wrap items-center justify-center w-full py-[2.5rem]'>
			<div className='w-full mr-auto lg:w-1/2 flex flex-col items-start content-around flex-wrap bg-[#34568b] h-[43.75rem] justify-center'>
				<div className='c7heading'>
					<h1 className='pb-[0.25rem] text-5xl italic font-light text-white'>
						Who is LinkedIn for?
					</h1>
					<h2 className='pb-[1.5rem] text-3xl italic font-light text-white'>
						Anyone looking to navigate their professional life.
					</h2>
				</div>
				<div className='flex flex-col items-center gap-[1rem]'>
					{<BtnList data={btnData} />}
				</div>
			</div>
			<div className='flex-grow-[0.5]'>
				<img src={person3} alt='' className='w-[43.75rem] lg:w-[34.375rem]' />
			</div>
		</div>
	);
}

export default Find;
