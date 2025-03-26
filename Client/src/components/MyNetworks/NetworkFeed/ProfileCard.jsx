/** @format */

import { useNavigation } from "../../../hooks/useNavigation";

function ProfileCard({ user }) {
  const { NavigateToVisitedProfile } = useNavigation();
  return (
    <div
      onClick={() => NavigateToVisitedProfile(user._id)}
      className="flex h-[12rem] w-[9rem] cursor-pointer flex-col border-2 md:w-[12rem]"
    >
      <section className="relative">
        <img
          src={user.coverPicture}
          alt="Cover"
          className="h-[3rem] w-full border object-cover"
        />
        <img
          src={user.profilePicture}
          alt="Profile"
          className="absolute -bottom-[1rem] left-5 h-[3rem] w-[3rem] rounded-full border border-white object-cover"
        />
      </section>

      {/* Ensure bio section takes available space */}
      <section className="flex-grow px-4 pt-4">
        <h1 className="text-sm font-semibold md:text-base">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-xs font-thin text-gray-400 md:text-sm">{user.bio}</p>
      </section>

      {/* Keep button always at the bottom */}
      <section className="px-3 pb-2">
        <button className="w-full border rounded-full border-LinkedInBlue text-LinkedInBlue hover:bg-gray-100">
          Follow
        </button>
      </section>
    </div>
  );
}

export default ProfileCard;
