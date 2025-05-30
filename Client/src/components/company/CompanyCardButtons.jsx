import useThemeClasses from "../../hooks/useThemeClasses";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SendIcon from "@mui/icons-material/Send";

function CompanyCardButtons() {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  return (
    <div className={`mb-2 flex gap-[0.5rem] font-semibold md:my-0 md:text-lg`}>
      <div className="flex gap-[0.5rem]">
        <button className="flex h-[2rem] items-center gap-1 rounded-full border border-LinkedInBlue bg-LinkedInBlue px-3 text-[8px] text-white hover:bg-blue-900 md:px-5 md:text-sm">
          <PersonAddIcon sx={{ fontSize: { xs: 15, md: 20 } }} />
          <p>Follow</p>
        </button>

        <button
          className={`${hoverColorClass} flex h-[2rem] items-center gap-1 rounded-full border border-LinkedInBlue px-3 text-[8px] text-LinkedInBlue md:px-5 md:text-sm`}
        >
          <SendIcon
            sx={{ fontSize: { xs: 15, md: 20 } }}
            className="-rotate-45 transform"
          />
          <p>Message</p>
        </button>
      </div>

      <button
        className={`${textColorClass} h-[2rem] items-center rounded-full border border-gray-600 px-3 text-[8px] text-gray-600 hover:border-2 hover:border-gray-900 md:text-sm ${hoverColorClass} md:px-5`}
      >
        More
      </button>
    </div>
  );
}

export default CompanyCardButtons;
