import { useState } from "react";
import { LikePost } from "../../api/postAPI.js";
import useToken from "../../hooks/useToken.js";

function InputOption({
  Icon,
  title,
  color,
  postID,
  userID,
  LikedBy,
  onLikeUpdate,
  onCommentUpdate,
}) {
  const colorClasses = {
    Like: "hover:text-likeColor",
    Comment: "hover:text-orange-500",
    Repost: "hover:text-green-500",
    Send: "hover:text-black",
  };

  const token = useToken();
  const colorClass = colorClasses[title] || "";

  const [isLiked, setIsLiked] = useState(LikedBy?.includes(userID));

  const handleLike = async () => {
    try {
      const { data, status } = await LikePost(postID, userID, token);
      if (status === !200 || !data) return;
      setIsLiked((prev) => data.likedBy.includes(userID));

      if (onLikeUpdate) {
        onLikeUpdate(data.likesCount);
      }
    } catch (error) {
      console.error("Error handling like: ", error);
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center gap-1 text-gray-600 ${colorClass} cursor-pointer rounded-lg p-2 hover:bg-gray-100 ${
        title === "Like" && isLiked ? "text-likeColor" : ""
      }`}
      onClick={
        title === "Like"
          ? handleLike
          : title === "Comment"
            ? onCommentUpdate
            : null
      }
    >
      <Icon style={{ color: color }} />
      <h4 className="hidden md:block">{title}</h4>
    </div>
  );
}

export default InputOption;
