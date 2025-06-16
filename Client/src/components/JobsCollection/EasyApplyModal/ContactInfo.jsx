import useThemeClasses from "../../../hooks/useThemeClasses";

function ContactInfo({
  profilePicture,
  firstName,
  lastName,
  bio,
  location,
  city,
}) {
  const { textColorClass } = useThemeClasses();

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-base font-semibold">Contact Info:</h1>
      <div className="flex items-center gap-1">
        <section>
          <img src={profilePicture} className="size-12 rounded-full" alt="" />
        </section>
        <section>
          <h1 className={`${textColorClass} text-sm font-semibold`}>
            {firstName + " " + lastName}
          </h1>
          <p className={`${textColorClass} text-xs`}>{bio}</p>
          <p className={`${textColorClass} text-xs text-gray-400`}>
            {city + ", " + location}
          </p>
        </section>
      </div>
    </div>
  );
}

export default ContactInfo;
