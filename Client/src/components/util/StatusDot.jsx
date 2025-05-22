const StatusDot = ({ activeStatus }) => {
  if (!activeStatus) return null;

  return <span className="mt-1 size-2 rounded-full bg-green-500"></span>;
};

export default StatusDot;
