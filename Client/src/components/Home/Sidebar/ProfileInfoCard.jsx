import useThemeClasses from '../../../hooks/useThemeClasses';
import useNavigation from '../../../hooks/useNavigation';
import useUser from '../../../hooks/useUser';
import LoadingSpinner from '../../util/LoadingSpinner';
import AddIcon from '@mui/icons-material/Add';
import { useDetailForm } from '../../../hooks/useDetailForm';
import DetailsForm from '../../profile/DetailsForm/DetailsForm';
import { useEffect } from 'react';

function ProfileInfoCard() {
  const { NavigateToProfile } = useNavigation();
  const { textColorClass, componentBGColorClass, borderClass, darkMode } =
    useThemeClasses();
  const {
    _id,
    coverPicture,
    profilePicture,
    firstName,
    lastName,
    bio,
    location,
    city,
    experiences,
  } = useUser();
  console.log(firstName);
  const { ExperienceInfo, setters, forms } = useDetailForm({
    firstName,
    lastName,
    bio,
    location,
    city,
    _id,
  });
  const experience =
    Array.isArray(experiences) && experiences.length > 0
      ? experiences[0]
      : null;
  useEffect(() => {
    console.log(forms.isDetailsForm);
  }, [forms.isDetailsForm]);
  return (
    <div
      className={`relative flex flex-col items-start gap-1 rounded-xl pb-3 ${borderClass} ${componentBGColorClass}`}
    >
      <div
        onClick={NavigateToProfile}
        className='relative h-[5rem] w-full cursor-pointer'
      >
        <img
          src={coverPicture}
          alt=''
          className='h-[80%] w-full rounded-t-lg object-cover'
        />
        <img
          src={profilePicture}
          alt='profilePicture'
          className='absolute -bottom-[20%] left-[8%] z-10 size-16 transform rounded-full border bg-white object-cover'
        />
      </div>

      <button onClick={NavigateToProfile} className={`mt-5 flex flex-col pl-5`}>
        <h2
          className={`${textColorClass} text-lg font-semibold hover:underline`}
        >
          {firstName} {lastName}
        </h2>
      </button>

      <span
        className={`pl-5 pr-3 text-start text-[9px] ${
          darkMode ? textColorClass : 'text-gray-600'
        }`}
      >
        {bio}
      </span>
      {city && (
        <span
          className={`px-5 text-start text-[10px] ${
            darkMode ? textColorClass : 'text-gray-600'
          }`}
        >
          {city}, {location}
        </span>
      )}

      <div
        className={`px-5 text-start text-[10px] ${
          darkMode ? textColorClass : 'text-gray-600'
        }`}
      >
        {experience ? (
          <span className='flex items-center gap-1 font-bold'>
            <img
              src={experience.company[0].profilePicture}
              alt=''
              className='size-5'
            />
            {experience.company[0].name}
          </span>
        ) : (
          <button
            type='button'
            onClick={() => {
              setters.setCompanyName('');
              setters.setJobTitle('');
              forms.openExperienceForm();
            }}
            className={`flex items-center gap-2 rounded-lg bg-gray-200 px-3 py-1 text-gray-500 hover:bg-opacity-70`}
          >
            <AddIcon fontSize='small' />
            Experience
          </button>
        )}

        {forms.isDetailsForm === true ? (
          <div className='fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50'>
            <DetailsForm
              currentUser={{
                _id,
                firstName,
                lastName,
                bio,
                location,
                city,
                experiences,
              }}
              openExperienceForm={forms.openExperienceForm}
              openEducationForm={forms.openEducationForm}
              closeForm={forms.closeForm}
              ExperienceInfo={ExperienceInfo}
              forms={forms}
              setters={setters}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProfileInfoCard;
