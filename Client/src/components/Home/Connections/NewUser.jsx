import { Avatar } from '@mui/material';
import useThemeClasses from '../../../hooks/useThemeClasses';
import AddIcon from '@mui/icons-material/Add';
import useNavigation from '../../../hooks/useNavigation';
import {
  cancelConnectionRequest,
  sendConnectionRequest,
} from '../../../api/connectionAPI';
import useUser from '../../../hooks/useUser';
import { useState } from 'react';
function NewUser({ Name, bio, pic, _id }) {
  const { componentBGColorClass, textColorClass, darkMode } = useThemeClasses();
  const { _id: userID } = useUser();
  const { NavigateToVisitedProfile } = useNavigation();

  const [isPending, setIspending] = useState(false);
  const handleConnect = async () => {
    setIspending(!isPending);
    await sendConnectionRequest(userID, _id);
    if (isPending) {
    } else {
      await cancelConnectionRequest(userID, _id);
    }
  };
  return (
    <div className={`${componentBGColorClass} mb-3 flex flex-col gap-3`}>
      <div
        className={`${componentBGColorClass} flex cursor-pointer gap-2 p-2 ${textColorClass}`}
      >
        <Avatar
          sizes='lg'
          className='border'
          src={pic}
          onClick={() => NavigateToVisitedProfile(_id)}
        >
          {Name?.[0]}
        </Avatar>
        <div className='flex flex-col gap-2'>
          <div>
            {' '}
            <h4
              className='text-sm'
              onClick={() => NavigateToVisitedProfile(_id)}
            >
              {Name}
            </h4>
            <p
              className='text-xs text-gray-500'
              onClick={() => NavigateToVisitedProfile(_id)}
            >
              {bio}
            </p>
          </div>

          <button
            onClick={(isPending) => handleConnect(isPending)}
            className={`flex w-[7rem] items-center justify-center gap-1 rounded-2xl border-[0.125rem] border-gray-500 p-1 font-normal ${darkMode ? `${textColorClass} hover:border-white` : 'text-gray-500 hover:border-black hover:text-black'} hover:shadow-lg" transition-all duration-100 hover:font-medium`}
          >
            <AddIcon
              className={` ${darkMode ? textColorClass : 'text-black'} `}
              fontSize='small'
            />
            <p>{isPending ? 'Pending' : 'Connect'}</p>
          </button>
        </div>
      </div>
      <div className='mx-4 flex border border-gray-200'></div>
    </div>
  );
}

export default NewUser;
