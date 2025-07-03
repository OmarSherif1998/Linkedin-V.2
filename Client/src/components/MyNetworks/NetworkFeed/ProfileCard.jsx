/** @format */

import { useState } from 'react';
import useNavigation from '../../../hooks/useNavigation';
import useThemeClasses from '../../../hooks/useThemeClasses';

function ProfileCard({ suggestedUser }) {
  const { hoverColorClass } = useThemeClasses();
  const { NavigateToVisitedProfile } = useNavigation();
  const [ispending, setIsPending] = useState(false);
  return (
    <div
      onClick={() => NavigateToVisitedProfile(suggestedUser._id)}
      className='flex h-[12rem] w-[9rem] cursor-pointer flex-col rounded-lg border-2 xl:w-[12rem]'
    >
      <section className='relative mb-2'>
        <img
          src={suggestedUser.coverPicture}
          alt='Cover'
          className='h-[3rem] w-full border object-cover'
        />
        <img
          src={suggestedUser.profilePicture}
          alt='Profile'
          className='absolute -bottom-[1rem] left-[32%] h-[3rem] w-[3rem] rounded-full border border-white object-cover'
        />
      </section>

      {/* Ensure bio section takes available space */}
      <section className='flex-grow px-4 pt-4 text-center'>
        <h1 className='text-sm font-semibold xl:text-base'>
          {suggestedUser.firstName} {suggestedUser.lastName}
        </h1>
        <p className='text-xs font-thin text-gray-400'>{suggestedUser.bio}</p>
      </section>

      {/* Keep button always at the bottom */}
      <section className='px-3 pb-2'>
        <button
          className={`w-full rounded-full border border-LinkedInBlue text-LinkedInBlue ${hoverColorClass}`}
        >
          Connect
        </button>
      </section>
    </div>
  );
}

export default ProfileCard;
