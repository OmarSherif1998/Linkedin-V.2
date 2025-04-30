import React from "react";

function ChatHeader({
  profilePicture,
  firstName,
  lastName,
  _id,
  bio,
  NavigateToVisitedProfile,
}) {
  return (
    <section className="flex flex-col items-center p-5 mb-2 -mx-3 border-b border-gray-600">
      <img
        src={profilePicture}
        alt=""
        className="object-cover w-20 h-20 mr-2 rounded-full"
      />
      <h2 className="text-sm font-medium">
        {firstName} {lastName}
      </h2>
      <p className="font-thin text-center">{bio}</p>
      <button
        onClick={() => NavigateToVisitedProfile(_id)}
        className="px-3 mt-2 text-white bg-blue-600 rounded-xl"
      >
        View Profile
      </button>
    </section>
  );
}

export default ChatHeader;
