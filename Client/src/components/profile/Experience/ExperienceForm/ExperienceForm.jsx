/** @format */

import React, { useEffect, useState } from 'react';
import FormNav from '../../../util/FormsUtil/FormNav';
import InputComponent from '../../../util/FormsUtil/InputComponent';
import LabelComponent from '../../../util/FormsUtil/LabelComponent';
import DropDownComponent from '../../../util/FormsUtil/DropDownComponent';
import TextAreaComponent from '../../../util/FormsUtil/TextAreaComponent';
import Checkbox from '@mui/material/Checkbox';
import {
	Years,
	Months,
	options,
	locationTypes,
	descriptionPlaceholder,
} from '../../../../staticData/FormStaticData';

function ExperienceForm({ closeForm, submitChanges, ExperienceInfo, setters }) {
	const [checked, setChecked] = useState(false);
	const [startMonth, setStartMonth] = useState('');
	const [startYear, setStartYear] = useState('');
	const [endMonth, setEndMonth] = useState('');
	const [endYear, setEndYear] = useState('');
	const dates = {
		startDate: `${startMonth}, ${startYear}`,
		endDate: endMonth && endYear ? `${endMonth}, ${endYear}` : 'Present',
	};

	useEffect(() => {
		setters.setIsCurrent(checked);
	}, [checked]);
	return (
		<div className='flex flex-col  w-[45rem] h-[30rem] overflow-auto  gap-5 p-6  bg-white rounded-lg shadow-lg'>
			<FormNav
				closeForm={closeForm}
				Title='Add a new experience'
				formVersion=' job'
			/>

			<section>
				<LabelComponent label={'Title'} required={true} />
				<InputComponent
					placeholder={'Ex: Retail Sales Manager'}
					onChange={(e) => setters.setJobTitle(e.target.value)}
				/>
			</section>
			<section className='flex flex-col'>
				<LabelComponent label={'Employment Type'} required={false} />
				<DropDownComponent
					options={options}
					onChange={(e) => setters.setEmploymentType(e.target.value)}
					disabled={false}
				/>
			</section>
			<section>
				<LabelComponent label={'Company or organization'} required={true} />
				<InputComponent
					placeholder={'Ex: Capgemini'}
					onChange={(e) => setters.setCompanyName(e.target.value)}
				/>
			</section>
			<section className='flex items-center '>
				<Checkbox
					color='success'
					checked={checked}
					onClick={() => {
						setChecked(!checked);
					}}
				/>
				<p>I am currently working in this role</p>
			</section>
			<section>
				<LabelComponent label={'Start date'} required={true} />
				<div className='flex gap-3'>
					<DropDownComponent
						options={Months}
						onChange={(e) => setStartMonth(e.target.value)}
					/>
					<DropDownComponent
						options={Years}
						onChange={(e) => setStartYear(e.target.value)}
					/>
				</div>
			</section>

			<section>
				<LabelComponent label={'End date'} />
				<div className='flex gap-3'>
					<DropDownComponent
						options={Months}
						disabled={checked}
						onChange={(e) => setEndMonth(e.target.value)}
					/>
					<DropDownComponent
						options={Years}
						disabled={checked}
						onChange={(e) => setEndYear(e.target.value)}
					/>
				</div>
			</section>
			<section>
				<LabelComponent label={'Location'} />
				<InputComponent
					placeholder={'Ex: London, United Kingdom'}
					onChange={(e) => setters.setLocation(e.target.value)}
				/>
			</section>
			<section>
				<LabelComponent label={'Location Type'} />
				<DropDownComponent
					options={locationTypes}
					onChange={(e) => setters.setLocationType(e.target.value)}
				/>
			</section>
			<section>
				<LabelComponent label={'Description'} />
				<TextAreaComponent
					height={'20'}
					placeholder={descriptionPlaceholder}
					onChange={(e) => setters.setDescription(e.target.value)}
				/>
			</section>
			<div className='flex pt-5 border-t border-gray-400'>
				<button
					onClick={() =>
						submitChanges(ExperienceInfo, 'Experience Form', dates)
					} // Don't forget to add an object that contains all the values of the form
					className='p-2 ml-auto font-semibold text-white bg-LinkedInBlue hover:blue-900 rounded-xl w-[15%]'
				>
					Save
				</button>
			</div>
		</div>
	);
}
export default ExperienceForm;
