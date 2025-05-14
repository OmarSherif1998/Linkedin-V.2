/** @format */

import EditOutlined from "@mui/icons-material/EditOutlined";
import useThemeClasses from "../../hooks/useThemeClasses";

function ProfileLangURL() {
  const {
    componentBGColorClass,
    textColorClass,
    borderClass,
    hoverColorClass,
  } = useThemeClasses();
  return (
    <div
      className={`mt-[0.5rem] flex h-fit flex-col justify-around gap-5 rounded-md ${borderClass} ${componentBGColorClass} p-5 shadow-xl`}
    >
      <div className="flex">
        <div>
          <h1 className={`text-lg font-semibold ${textColorClass}`}>
            Profile Language
          </h1>
          <span className="text-gray-500">English</span>
        </div>
        <div className="ml-auto">
          <EditOutlined
            fontSize="large"
            className={`${textColorClass} cursor-pointer rounded-full p-1 ${hoverColorClass}`}
          />
        </div>
      </div>
      <div className={`border-t ${borderClass}`}></div>
      <div className="flex">
        <div>
          <h1 className={`text-lg font-semibold ${textColorClass}`}>
            Public Profile & URL
          </h1>
          <span className="text-xs text-gray-500">
            https://www.linkedin.com/in/omar-sherif-302225202
          </span>
        </div>
        <div className="ml-auto">
          <EditOutlined
            fontSize="large"
            className={`${textColorClass} cursor-pointer rounded-full p-1 ${hoverColorClass}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileLangURL;
