/** @format */

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import companyImage from "../../../images/defaultCompImg.jpeg";
import defaultEducation from "../../../images/defaultEducation.jpg";
import UserInfo from "./UserInfo";
import ProfileCardButtons from "./ProfileCardButtons";
import useThemeClasses from "../../../hooks/useThemeClasses";

function ProfileInfoHeader({
  type,
  firstName,
  lastName,
  username,
  openDetailsForm,
  bio,
  city,
  location,
  connectionText,
  experiences,
  education,
  user,
  currentUser,
}) {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  return (
    <div className={`${textColorClass} flex flex-col`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h1 className="truncate font-semibold md:text-2xl">
            {type === "Me" ? `${firstName} ${lastName}` : username}
          </h1>
          <VerifiedUserOutlinedIcon fontSize="small" />
        </div>
        {type === "Me" ? (
          <div
            onClick={openDetailsForm}
            className={`flex cursor-pointer rounded-full p-1 ${hoverColorClass} `}
          >
            <EditOutlinedIcon sx={{ color: "gray" }} fontSize="medium" />
          </div>
        ) : null}
      </div>
      <div className="flex justify-between">
        <UserInfo
          bio={bio}
          city={city}
          location={location}
          connectionText={connectionText}
          experiences={experiences}
          education={education}
        />

        <section className="hidden flex-col gap-2 md:flex">
          <div className="flex items-center gap-1">
            <img className="size-9" src={companyImage} alt="" />
            <p>{experiences.at(-1).companyName}</p>
          </div>
          <div className="flex items-center gap-1">
            <img className="size-9" src={defaultEducation} alt="" />
            <p>{education.at(-1).institutionName}</p>
          </div>
        </section>
      </div>
      <ProfileCardButtons type={type} user={user} currentUser={currentUser} />
    </div>
  );
}

export default ProfileInfoHeader;
