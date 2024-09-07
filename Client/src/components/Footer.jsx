/** @format */

import React from 'react';
import { ColumnList, SubColumnList } from '../functions/footerFunctions.js';
import {
	column1,
	column2,
	column3,
	column4,
	column5,
} from '../staticData/footerData';

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
