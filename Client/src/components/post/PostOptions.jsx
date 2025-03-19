import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
function PostOptions({
  fileInputRef,
  handleFileChange,
  handleSubmit,
  input,
  hanldePic,
}) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex space-x-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        <ImageOutlinedIcon
          className="cursor-pointer rounded-lg text-blue-500 hover:bg-gray-300"
          onClick={hanldePic}
        />
        <MoodOutlinedIcon className="cursor-pointer text-yellow-500" />
        <MoreHorizOutlinedIcon className="cursor-pointer text-gray-500" />
      </div>
      <div className="flex items-center gap-2">
        <AccessTimeOutlinedIcon className="text-gray-500" />
        <button
          onClick={handleSubmit}
          className={`cursor-pointer rounded-full bg-blue-600 px-4 py-1 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 ${
            !input.trim() ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!input.trim()}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default PostOptions;
