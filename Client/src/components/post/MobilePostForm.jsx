import CloseIcon from "@mui/icons-material/Close";
import { usePostModal } from "../../hooks/usePostModal";
import PostOptions from "./PostOptions";

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
  return (
    <div className="flex h-full w-full flex-col bg-white p-10">
      <button
        onClick={onClose}
        className="ml-auto flex items-center gap-1 text-gray-600 hover:text-gray-900"
      >
        <CloseIcon className="hidden sm:block" />
      </button>

      <div className="flex-1 overflow-auto">
        <div className="flex items-start gap-1">
          <img src={profilePicture} alt="" className="mt-3 size-7" />
          <textarea
            className="max-h-[60vh] min-h-[10rem] w-full flex-1 resize-none overflow-auto rounded-lg p-2 text-lg placeholder-gray-500 focus:outline-none"
            placeholder="What do you want to talk about?"
            onChange={handleInputChange}
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
