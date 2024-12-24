/** @format */

import React from 'react';
import ButtonComponent from '../../../util/FormsUtil/ButtonComponent';
import InputComponent from '../../../util/FormsUtil/InputComponent';
import ContactInfo from './ContactInfo';
import WebsiteInfo from './WebsiteInfo';
import FormNav from '../../../util/FormsUtil/FormNav';
import TextAreaComponent from '../../../util/FormsUtil/TextAreaComponent';
import LabelComponent from '../../../util/FormsUtil/LabelComponent';

function PersonalForm({
	closeForm,
	personalFormInputs,
	submitChanges,
	PersonalInfo,
}) {
	return (
		<div className=' flex flex-col  w-[45rem] h-[30rem]  gap-5 p-6  bg-white rounded-lg shadow-lg'>
			<FormNav closeForm={closeForm} Title='Personal Information' />

			<form className='flex flex-col gap-5 overflow-auto'>
				{personalFormInputs.map((inputs, index) => {
					return (
						<div className='flex flex-col' key={index}>
							<LabelComponent label={inputs.label} required={inputs.required} />

							{inputs.label === 'Bio' ? (
								<TextAreaComponent
									value={inputs.value}
									onChange={inputs.onchange}
								/>
							) : inputs.label === 'Current Position' ||
							  inputs.label === 'Education' ? (
								<div>
									<span>{inputs.value}</span>
								</div>
							) : (
								<InputComponent
									value={inputs.value}
									onChange={inputs.onchange}
								/>
							)}

							{inputs.buttonText && inputs.buttonClass && (
								<ButtonComponent {...inputs} />
							)}
						</div>
					);
				})}
				<ContactInfo />
				<WebsiteInfo />
			</form>
			<div className='flex pt-5 border-t border-gray-400'>
				<button
					onClick={() => submitChanges(PersonalInfo)}
					className='p-2 ml-auto font-semibold text-white bg-LinkedInBlue hover:blue-900 rounded-xl w-[15%]'
				>
					Save
				</button>
			</div>
		</div>
	);
}

export default PersonalForm;
