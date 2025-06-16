import CloseIcon from "@mui/icons-material/Close";
import { usePostModal } from "../../hooks/usePostModal";
import PostOptions from "./PostOptions";
import useThemeClasses from "../../hooks/useThemeClasses";

function MobilePostForm({ onClose, profilePicture }) {
  const {
    input,
    isPicAvailable,
    tempPicURL,
    fileInputRef,
    handleFileChange,
    hanldePic,
    handleInputChange,
    handleSubmit,
  } = usePostModal(onClose);

  const { textColorClass, componentBGColorClass } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} flex h-full w-full flex-col gap-8 p-10`}
    >
      <section className="flex items-center justify-between">
        <img
          src={profilePicture}
          alt=""
          className="mt-3 size-10 rounded-full"
        />

        <CloseIcon
          fontSize="large"
          onClick={onClose}
          className={`hover:${textColorClass} hidden text-gray-600 sm:block`}
        />
      </section>

      <div className="flex-1 overflow-auto">
        <div className="flex items-start gap-1">
          <textarea
            className={`${componentBGColorClass} ${textColorClass} max-h-[60vh] min-h-[10rem] w-full flex-1 resize-none overflow-auto border-none p-2 text-lg placeholder-gray-500 placeholder:text-xl focus:outline-none`}
            onChange={handleInputChange}
            placeholder="What do you want to talk about?"
            value={input}
          />
        </div>

        {/* Display image immediately below the text */}
        {isPicAvailable && (
          <div className="mt-2 flex justify-center">
            <img src={tempPicURL} alt="" className="h-[15rem] w-fit" />
          </div>
        )}
      </div>

      <PostOptions
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        input={input}
        hanldePic={hanldePic}
      />
    </div>
  );
}

export default MobilePostForm;
