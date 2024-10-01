/** @format */

import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
function PremiumAd() {
	return (
		<div className='flex flex-col gap-5 p-5 bg-white rounded-lg shadow-lg '>
			<section>
				{' '}
				<title className='flex justify-between text-lg font-semibold'>
					<h1>Job search smarter</h1>
					<button>
						<CloseIcon
							fontSize='large'
							className='p-1 rounded-full hover:bg-gray-200'
						/>
					</button>
				</title>
				<h3 className=''>
					See who’s viewed your profile and directly message recruiters with
					InMail.
				</h3>
			</section>

			<button className='px-4 py-1 rounded-full bg-LightGold hover:bg-gold w-fit'>
				Try Premium for EGP0
			</button>

			<h5 className='text-sm font-thin'>
				1-month free trial. We’ll send you a reminder 7 days before your trial
				ends.
			</h5>
		</div>
	);
}

export default PremiumAd;
