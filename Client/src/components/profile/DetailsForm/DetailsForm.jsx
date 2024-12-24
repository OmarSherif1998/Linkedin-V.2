/** @format */

import AddIcon from '@mui/icons-material/Add';
import PersonalForm from './PersonalForm/PersonalForm';
import ExperienceForm from '../Experience/ExperienceForm/ExperienceForm';
import {
	updateUserEducation,
	updateUserExperience,
	updateUserInfo,
} from '../../../api/userAPI';
import EducationForm from '../Education/EducationForm/EducationForm';

function DetailsForm({
	currentUser,
	PersonalInfo,
	ExperienceInfo,
	EducationInfo,
	openExperienceForm,
	openEducationForm,
	setters,
	forms,
	closeForm,
}) {
	const personalFormInputs = [
		{
			label: 'First Name',
			value: PersonalInfo.firstName,
			onchange: (e) => setters.setFirstName(e.target.value),
			required: true,
		},
		{
			label: 'Last Name',
			value: PersonalInfo.lastName,
			onchange: (e) => setters.setLastName(e.target.value),
			required: true,
		},
		{
			label: 'Bio',
			value: PersonalInfo.bio,
			onchange: (e) => setters.setBio(e.target.value),
			required: false,
		},
		{
			label: 'Current Position',
			value: ExperienceInfo.jobTitle,

			required: false,
			buttonText: (
				<span className='flex items-center gap-1'>
					<AddIcon /> Add a new Position
				</span>
			),
			buttonClass: 'flex gap-2   font-semibold ',
			buttonHandler: () => openExperienceForm(),
		},
		{
			label: 'Education',
			value: PersonalInfo.education,

			required: false,
			buttonText: (
				<span className='flex items-center gap-1'>
					<AddIcon /> Add a new Education
				</span>
			),
			buttonClass: 'flex gap-2 font-semibold ',
			buttonHandler: () => openEducationForm(),
		},
		{
			label: 'Location',
			value: PersonalInfo.location,
			onchange: (e) => setters.setLocation(e.target.value),
			required: true,
		},
		{
			label: 'City',
			value: PersonalInfo.city,
			onchange: (e) => setters.setCity(e.target.value),
			required: true,
		},
	];

	const submitChanges = async (userInfo, formName, dates) => {
		try {
			if (formName === 'Experience Form') {
				userInfo.startDate = dates.startDate;
				userInfo.endDate = dates.endDate;

				await updateUserExperience({
					_id: currentUser._id,
					experience: userInfo,
				});
			} else if (formName === 'Education Form') {
				userInfo.educationStartDate = dates.startDate;
				userInfo.educationEndDate = dates.endDate;

				await updateUserEducation({
					_id: currentUser._id,
					education: userInfo,
				});
			} else {
				await updateUserInfo({ _id: currentUser._id, ...userInfo });
			}
			//closeForm();
		} catch (error) {
			console.error('Error updating user profile', error);
		}
	};

	return (
		<div>
			{forms.isPersonalForm === true ? (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 '>
					<PersonalForm
						personalFormInputs={personalFormInputs}
						PersonalInfo={PersonalInfo}
						submitChanges={submitChanges}
						closeForm={closeForm}
					/>
				</div>
			) : forms.isExperienceForm === true ? (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 '>
					<ExperienceForm
						currentUser={currentUser}
						ExperienceInfo={ExperienceInfo}
						setters={setters}
						submitChanges={submitChanges}
						closeForm={closeForm}
					/>
				</div>
			) : forms.isEducationForm === true ? (
				<EducationForm
					currentUser={currentUser}
					EducationInfo={EducationInfo}
					setters={setters}
					submitChanges={submitChanges}
					closeForm={closeForm}
				/>
			) : null}
		</div>
	);
}

export default DetailsForm;
