function UserInfo({
  bio,
  city,
  location,
  connectionText,
  companyName,
  companyImg,
  education,
}) {
  return (
    <div>
      <p className="text-md">{bio}</p>

      <div className="flex items-center gap-1 md:hidden">
        <p>{companyName}</p>
        <p>{education.at(-1).institutionName}</p>
      </div>

      <div className="flex items-center gap-1">
        {city || location ? (
          <>
            <p className="text-sm text-gray-600">
              {city}, {location}
            </p>
            <p className="text-xs">•</p>
          </>
        ) : null}

        <button className="text-sm font-semibold text-LinkedInBlue hover:underline">
          Contact Info
        </button>
      </div>
      <button className="mt-[0.4rem] text-sm font-normal text-LinkedInBlue">
        {connectionText}
      </button>
    </div>
  );
}

export default UserInfo;
