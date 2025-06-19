import { formatTimeToHHMM } from '../../functions/formatTimeToHHMM';
import LoadingSpinner from '../util/LoadingSpinner';
import useThemeClasses from '../../hooks/useThemeClasses';
import useUser from '../../hooks/useUser';
import useScreenSize from '../../hooks/useScreenSize';
function MessagingList({ chats, isLoading, handleActiveChatInfo, activeChat }) {
  const { isMobile } = useScreenSize();
  const { darkMode, textColorClass, hoverColorClass, borderColor } =
    useThemeClasses();
  const { _id } = useUser();
  return (
    <div className='w-full overflow-y-auto'>
      {isLoading ? (
        <LoadingSpinner spinnerSize={10} />
      ) : (
        chats?.map((chat) => {
          return (
            <div
              onClick={() => {
                handleActiveChatInfo(chat.roomID, chat._id);
              }}
              key={chat._id}
              className={`${hoverColorClass} border-b ${borderColor} flex cursor-pointer items-start gap-3 px-4 py-3 transition-all ${
                !isMobile && activeChat === chat.roomID
                  ? `border-l-2 border-green-500 ${darkMode ? 'bg-gray-8 00' : 'bg-gray-300'}`
                  : null
              }`}
            >
              <img
                src={chat.profilePicture}
                alt={chat.name}
                className='h-12 w-12 rounded-full object-cover'
              />
              <div className='flex flex-1 flex-col pb-2 md:border-b'>
                <div className='flex items-center justify-between'>
                  <h3 className={`${textColorClass} text-[15px] font-semibold`}>
                    {chat.name}
                  </h3>
                  <span className='text-xs text-gray-400'>
                    {formatTimeToHHMM(chat.updatedAt)}
                  </span>
                </div>
                <p className='truncate text-sm text-gray-600'>
                  {_id === chat.sender ? 'You: ' : chat.name + ': '}
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MessagingList;
