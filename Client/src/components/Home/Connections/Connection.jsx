/** @format */
import { fetchFeedUsers } from '../../../api/userAPI';
import { useQuery } from '@tanstack/react-query';
import useNavigation from '../../../hooks/useNavigation';
import EastIcon from '@mui/icons-material/East';
import useThemeClasses from '../../../hooks/useThemeClasses';
import NewUser from './NewUser';
import useUser from '../../../hooks/useUser';
import LoadingSpinner from '../../util/LoadingSpinner';

function Connection({ pageSpecs }) {
  const { componentBGColorClass, borderClass, textColorClass, darkMode } =
    useThemeClasses();
  const { _id, connections } = useUser();
  const { NavigateToMyNetwork } = useNavigation();
  const { data: users, isLoading } = useQuery({
    queryKey: ['FeedUsers'],
    queryFn: () =>
      fetchFeedUsers({
        exclude: [_id, ...connections],
        limit: 3,
      }),
  });
  return (
    <div
      className={`${componentBGColorClass} ${borderClass} flex h-fit flex-col rounded-md border-gray-300 p-2 shadow-xl`}
    >
      <div className='flex flex-col p-2'>
        <div className='flex gap-1'>
          <h2
            className={`${darkMode ? textColorClass : 'text-gray-600'} text-base font-medium`}
          >
            {pageSpecs?.title}
          </h2>
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          users?.map((user, index) => (
            <div key={index}>
              <NewUser
                Name={user.firstName + ' ' + user.lastName}
                bio={user.bio}
                pic={user.profilePicture}
                _id={user._id}
              />
            </div>
          ))
        )}
      </div>
      <button
        className={`flex items-center ${textColorClass} justify-center gap-1 rounded-md p-1 hover:bg-LightMode`}
        onClick={NavigateToMyNetwork}
      >
        <h1 className='text-sm'>View all recommendations </h1>
        <EastIcon fontSize='sm' />
      </button>
    </div>
  );
}

export default Connection;
