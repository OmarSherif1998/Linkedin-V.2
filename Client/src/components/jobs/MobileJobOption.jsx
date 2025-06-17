import useThemeClasses from "../../hooks/useThemeClasses";

function MobileJobOption({ setShowPreferences }) {
  const { componentBGColorClass, borderColor } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} mb-10 flex w-full justify-evenly border-b ${borderColor} py-3`}
    >
      <button
        className={`rounded-full border border-gray-600 px-5 py-2 font-semibold text-gray-400`}
        onClick={setShowPreferences}
      >
        Preferneces
      </button>
      <button
        className={`rounded-full border border-gray-600 px-5 py-2 font-semibold text-gray-400`}
        onClick={null}
      >
        Jobs
      </button>
      <button
        className={`rounded-full border border-gray-600 px-5 py-2 font-semibold text-gray-400`}
        onClick={null}
      >
        Post a free Job
      </button>
    </div>
  );
}

export default MobileJobOption;
