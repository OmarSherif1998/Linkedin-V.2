import useThemeClasses from "../../../hooks/useThemeClasses";

function ChatHeader({
  profilePicture,
  firstName,
  lastName,
  _id,
  bio,
  NavigateToVisitedProfile,
}) {
  const { textColorClass } = useThemeClasses();
  return (
    <section
      className={`${textColorClass} -mx-3 mb-2 flex flex-col items-center border-b border-gray-600 p-5`}
    >
      <img
        src={profilePicture}
        alt=""
        className="mr-2 h-20 w-20 rounded-full object-cover"
      />
      <h2 className={`text-sm font-medium`}>
        {firstName} {lastName}
      </h2>
      <p className="text-center text-xs font-thin">{bio}</p>
      <button
        onClick={() => NavigateToVisitedProfile(_id)}
        className={`mt-2 rounded-xl bg-blue-600 px-3 text-white`}
      >
        View Profile
      </button>
    </section>
  );
}

export default ChatHeader;
