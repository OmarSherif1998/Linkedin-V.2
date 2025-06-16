import CloseIcon from "@mui/icons-material/Close";
import useThemeClasses from "../../../hooks/useThemeClasses";

function ContactInfoNav({ jobName, onClose }) {
  const { textColorClass, darkMode } = useThemeClasses();

  return (
    <section className="flex items-center justify-between border-b border-gray-700 pb-2">
      <h1 className="font-semibold">Apply to {jobName}</h1>
      <CloseIcon
        fontSize="small"
        className={`${darkMode ? textColorClass : "text-gray-500"} cursor-pointer hover:text-gray-700`}
        onClick={onClose}
      />
    </section>
  );
}

export default ContactInfoNav;
