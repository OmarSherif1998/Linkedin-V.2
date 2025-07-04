import InputOption from "../Options/InputOption";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import RepeatIcon from "@mui/icons-material/Repeat";
import SendIcon from "@mui/icons-material/Send";
import useThemeClasses from "../../hooks/useThemeClasses";

function InteractionButtons({
  postID,
  likedBy,
  likesCount,
  userID,
  handleLikeUpdate,
  handleCommentUpdate,
}) {
  const { borderColor } =
    useThemeClasses();
  return (
    <nav className={`flex justify-around gap-2 border-t ${borderColor} sm:px-4 md:gap-4`}>
      <InputOption
        postID={postID}
        userID={userID}
        LikedBy={likedBy}
        likeCount={likesCount}
        Icon={ThumbUpIcon}
        title="Like"
        onLikeUpdate={handleLikeUpdate}
      />
      <InputOption
        onCommentUpdate={handleCommentUpdate}
        Icon={CommentIcon}
        title="Comment"
      />
      <InputOption Icon={RepeatIcon} title="Repost" />
      <InputOption Icon={SendIcon} title="Send" />
    </nav>
  );
}

export default InteractionButtons;
