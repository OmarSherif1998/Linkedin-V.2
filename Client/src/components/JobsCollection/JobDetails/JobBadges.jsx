import CheckIcon from "@mui/icons-material/Check";
function JobBadges({ isRemote, type }) {
  return (
    <div className="flex gap-1">
      <section className="flex items-center rounded-md bg-green-900 px-1 text-sm text-white">
        {" "}
        <CheckIcon fontSize="20px" /> {isRemote ? "Remote" : "On-site"}
      </section>
      <section className="flex items-center rounded-md bg-green-900 px-1 text-sm text-white">
        {" "}
        <CheckIcon fontSize="20px" /> {type}
      </section>
    </div>
  );
}

export default JobBadges;
