import { useState } from 'react';
import {
  experienceLevel,
  employmentTypes,
  department,
} from '../../../staticData/JobsData';
import useThemeClasses from '../../../hooks/useThemeClasses';
import CloseIcon from '@mui/icons-material/Close';
import PreferenceDropdown from './PreferenceDropdown';
import useUser from '../../../hooks/useUser';
import { updateUserJobPreferences } from '../../../api/userAPI';

function PreferenceModal({ onClose, setPreferences, preferences }) {
  const { textColorClass, hoverColorClass, componentBGColorClass } =
    useThemeClasses();
  const { _id } = useUser();
  const [selectedLevel, setSelectedLevel] = useState(
    preferences.experienceLevel,
  );
  const [selectedType, setSelectedType] = useState(preferences.employmentType);
  const [selectedDepartment, setSelectedDepartment] = useState(
    preferences.department,
  );

  return (
    <div
      className={`w-full max-w-md rounded-xl p-6 shadow-lg ${componentBGColorClass} relative`}
    >
      {/* Header */}
      <div className='mb-4 flex items-center justify-between'>
        <h2 className={`text-lg font-semibold ${textColorClass}`}>
          Job Preferences
        </h2>
        <button
          onClick={onClose}
          className={`rounded-full p-1 ${hoverColorClass}`}
        >
          <CloseIcon className={`${textColorClass}`} />
        </button>
      </div>
      <div className='flex flex-col gap-2'>
        <PreferenceDropdown
          label='Experience Level'
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          options={experienceLevel}
          placeholder='Select a level'
        />
        <PreferenceDropdown
          label='Job Type'
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          options={employmentTypes}
          placeholder='Select a type'
        />
        <PreferenceDropdown
          label='Department'
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          options={department}
          placeholder='Select a department'
        />
      </div>
      {/* Save Button */}
      <button
        onClick={async () => {
          const newPreferences = {
            experienceLevel: selectedLevel,
            employmentType: selectedType,
            department: selectedDepartment,
          };
          setPreferences(newPreferences);
          await updateUserJobPreferences(newPreferences, _id);
          onClose();
        }}
        className={`mt-4 w-full rounded bg-blue-600 p-2 ${textColorClass} ${hoverColorClass}`}
      >
        Save
      </button>
    </div>
  );
}

export default PreferenceModal;
