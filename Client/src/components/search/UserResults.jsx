import { userFilters } from '../../staticData/SearchData';
import useNavigation from '../../hooks/useNavigation';
import useThemeClasses from '../../hooks/useThemeClasses';
import SearchFilter from './util/SearchFilter';
import useScreenSize from '../../hooks/useScreenSize';
import UserFollowButton from './util/UserFollowButton';
function UserResults({ users, morePeople }) {
  const { isMobile } = useScreenSize();
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const { NavigateToVisitedProfile } = useNavigation();
  const userArr = morePeople ? users.slice(3) : users.slice(0, 3);
  return (
    <div
      className={`${componentBGColorClass} ${isMobile ? 'rounded-none' : 'rounded-lg'} p-5`}
    >
      {users.length > 0 && (
        <section>
          <h2 className={`mb-4 text-xl font-semibold ${textColorClass}`}>
            {morePeople ? 'More People' : 'People'}
          </h2>
          <SearchFilter filters={userFilters} justify={'justify-start'} />
          {userArr.map((user) => (
            <div
              key={user._id}
              className={`flex cursor-pointer items-start justify-between gap-2 border-b px-4 py-3`}
            >
              {/* Left Section */}
              <div className='flex gap-4'>
                <img
                  onClick={() => NavigateToVisitedProfile(user._id)}
                  src={user.profilePicture}
                  alt='Profile'
                  className='size-14 rounded-full border object-cover md:size-16'
                />

                <div
                  className='flex flex-col justify-center'
                  onClick={() => NavigateToVisitedProfile(user._id)}
                >
                  <p className={`font-medium ${textColorClass}`}>
                    {user.firstName} {user.lastName}
                    <span className='ml-2 text-xs text-gray-400'>• 2nd</span>
                  </p>

                  <p className='text-sm text-gray-300'>
                    {user.bio || 'Software Engineer @ Capgemini'}
                  </p>

                  <p className='text-xs text-gray-400'>
                    {user.city}, {user.country}
                  </p>

                  <p className='mt-1 w-full px-20 py-2 text-xs text-gray-500'>
                    {/* Replace with dynamic connections if available */}
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <UserFollowButton isMobile={isMobile} />
            </div>
          ))}

          <div className='mt-4 text-center'>
            <button className='text-sm font-semibold text-blue-500 hover:underline'>
              See all people results
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default UserResults;
