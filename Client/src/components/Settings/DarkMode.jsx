import { useDispatch } from 'react-redux';
import { setDarkMode } from '../../Redux/sllices/themeSlice';
import { useOutletContext } from 'react-router-dom';
import { setDarkModePreference } from '../../api/SupportAPI';
import useThemeClasses from '../../hooks/useThemeClasses';
import useUser from '../../hooks/useUser';

function DarkMode() {
  const { darkMode, textColorClass, componentBGColorClass } = useThemeClasses();
  const { formWidth } = useOutletContext();
  const { _id } = useUser();
  const dispatch = useDispatch();

  const handleToggle = async () => {
    dispatch(setDarkMode(!darkMode));
    await setDarkModePreference(_id);
  };

  return (
    <div
      className={`flex flex-col gap-5 ${formWidth} h-fit md:rounded-lg ${componentBGColorClass} p-5`}
    >
      <div className='flex flex-col gap-1'>
        <h1 className={`text-2xl ${textColorClass} font-bold`}>Dark Mode</h1>
        <span className={`${textColorClass} marker: text-sm`}>
          Choose how your LinkedIn experience looks for this device.
        </span>
      </div>
      <label className='flex cursor-pointer items-center'>
        <span className='mr-3 text-sm font-medium text-gray-700 dark:text-gray-300'>
          Dark Mode
        </span>
        <div className='relative'>
          <input
            type='checkbox'
            checked={darkMode}
            onChange={handleToggle}
            className='sr-only'
          />
          <div
            className={`block h-8 w-14 rounded-full transition-colors duration-300 ${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 h-6 w-6 transform rounded-full bg-white transition-transform duration-300 ${
              darkMode ? 'translate-x-6' : ''
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
}

export default DarkMode;
