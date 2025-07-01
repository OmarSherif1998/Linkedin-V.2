import { useState } from 'react';
import { LikePost } from '../../api/postAPI.js';
import useToken from '../../hooks/useToken.js';
import useThemeClasses from '../../hooks/useThemeClasses.js';

function InputOption({
  Icon,
  title,
  postID,
  userID,
  LikedBy,
  color,
  onLikeUpdate,
  onCommentUpdate,
}) {
  const { textColorClass, hoverColorClass } = useThemeClasses();
  const colorClasses = {
    Like: 'likeColor',
    Comment: 'orange-500',
    Repost: 'green-500',
    Send: 'blue-500',
  };
  const token = useToken();
  const colorClass = colorClasses[title] || '';
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
      console.error('Error handling like: ', error);
    }
  };

  return (
    <div
      className={`my-1 flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 hover:text-${colorClass} ${hoverColorClass} ${
        title === 'Like' && isLiked ? 'text-likeColor' : `${textColorClass}`
      }`}
      onClick={
        title === 'Like'
          ? handleLike
          : title === 'Comment'
            ? onCommentUpdate
            : null
      }
    >
      <Icon style={{ color: color }} fontSize='10px' />

      <h4
        className={`${!isLiked ? textColorClass : ''} hidden text-sm md:block`}
      >
        {title}
      </h4>
    </div>
  );
}

export default InputOption;
