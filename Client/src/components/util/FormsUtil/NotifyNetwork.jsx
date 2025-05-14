/** @format */

import SwitchButton from "../../Buttons/SwitchButton";
import useThemeClasses from "../../../hooks/useThemeClasses";

function NotifyNetwork({ formVersion }) {
  const { darkMode } = useThemeClasses();
  return (
    <div
      className={`${darkMode ? "bg-blue-200" : "bg-blue-50"} mt-2 rounded-md p-2 font-sans`}
    >
      <h1 className="pb-1 text-sm font-semibold">Notify Network</h1>
      <section className="flex">
        <p className="text-sm text-gray-600">
          Turn on to notify your network of key profile changes (such as new
          {`${formVersion}`}) and work anniversaries. Updates can take up to 2
          hours.{" "}
          <span className="text-blue-600">
            Learn more about sharing profile changes.
          </span>
        </p>
        <button className="flex gap-3">
          on <SwitchButton />
        </button>
      </section>
    </div>
  );
}

export default NotifyNetwork;
