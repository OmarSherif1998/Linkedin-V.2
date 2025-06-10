import TurnRightIcon from "@mui/icons-material/TurnRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useThemeClasses from "../../../hooks/useThemeClasses";
function JobDetailsHeader({ profilePicture, name }) {
  const { textColorClass } = useThemeClasses();

  return (
    <section className={`${textColorClass} flex justify-between`}>
      <section className="flex items-center gap-2 font-semibold">
        <img src={profilePicture} alt="companyLogo" className="size-12" />{" "}
        <h1>{name}</h1>
      </section>
      <section className="flex gap-4">
        <TurnRightIcon />
        <MoreHorizIcon />
      </section>
    </section>
  );
}

export default JobDetailsHeader;
