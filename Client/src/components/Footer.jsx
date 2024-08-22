/** @format */

import React from 'react';
import InputOption from './InputOption';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	column1,
	column2,
	column3,
	column4,
	column5,
} from '../staticData/footerData';
const ColumnList = ({ data }) => {
	return (
		<ul>
			{data.map((col, index) => (
				<li
					key={index}
					className={`hover:cursor-pointer ${
						col.title ? 'font-bold' : 'font-normal  hover:text-blue-900 '
					}`}
				>
					{col.name}
				</li>
			))}
		</ul>
	);
};
const SubColumnList = ({ data }) => {
	return (
		<ul className='flex gap-[0.5rem]  pl-[1.25rem]'>
			<li>
				<img
					src={require('../images/linkedin - black.png')}
					alt=''
					className='h-[1rem] mt-[0.25rem] w-[4.5rem]'
				/>
			</li>
			{data.map((col, index) => (
				<li
					key={index}
					className='font-normal cursor-pointer hover:text-blue-800'
				>
					{col.name}
				</li>
			))}
			<li>
				<InputOption Icon={KeyboardArrowDownIcon} />
			</li>
		</ul>
	);
};

function Footer() {
	return (
		<div>
			<div className='flex flex-row gap-[1.25rem] py-[5rem] bg-footerGray justify-evenly'>
				<img
					src={require('../images/linkedin.png')}
					alt=''
					className='h-[2rem] w-[6.5rem]'
				/>
				<ColumnList data={column1} />
				<ColumnList data={column2} />
				<ColumnList data={column3} />
				<ColumnList data={column4} />
			</div>
			<div className='flex justify-center'>
				<SubColumnList data={column5} />
			</div>
		</div>
	);
}

export default Footer;
