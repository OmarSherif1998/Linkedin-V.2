import CheckIcon from "@mui/icons-material/Check";
function JobBadges({ isRemote, type }) {
  return (
    <div className="flex gap-1">
      <section className="flex p-1 text-white bg-green-900 rounded-md">
        {" "}
        <CheckIcon /> {isRemote ? "Remote" : "On-site"}
      </section>
      <section className="flex p-1 text-white bg-green-900 rounded-md">
        {" "}
        <CheckIcon /> {type}
      </section>
    </div>
  );
}

export default JobBadges;
