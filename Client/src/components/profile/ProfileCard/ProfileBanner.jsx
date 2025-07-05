/** @format */
import { useEffect, useState } from 'react';
import { usePicForm } from '../../../hooks/usePicForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PicForm from '../PicForm';
import coverPic from '../../../images/coverPic.jpg';
import useThemeClasses from '../../../hooks/useThemeClasses';
import useScrollLock from '../../../hooks/useScrollLock';
import NotificationsIcon from '@mui/icons-material/Notifications';

function ProfileBanner({
  coverPicture,
  profilePicture,
  currentUserID,
  connectionStatus,
  openDetailsForm,
}) {
  const { hoverColorClass } = useThemeClasses();
  const { handleChangePic, isPicForm } = usePicForm();
  const [img, setImg] = useState(profilePicture);

  useEffect(() => {
    setImg(profilePicture);
  }, [profilePicture]);
  useScrollLock(isPicForm);

  return (
    <div className={`flex flex-col`}>
      <div className='relative h-[8rem] lg:h-[11rem] 2xl:h-[18rem]'>
        <img
          src={coverPicture ? coverPicture : coverPic}
          alt='coverPicture'
          className='h-full w-full rounded-t-md object-cover'
        />

        <img
          src={img}
          alt='profilePicture'
          className={
            'absolute left-[2%] top-[55%] z-30 size-[6rem] cursor-pointer rounded-full border-2 bg-white object-cover lg:size-[7rem] 2xl:top-[60%] 2xl:size-[10rem]'
          }
          onClick={connectionStatus === 'self' ? handleChangePic : undefined}
        />

        {isPicForm && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <PicForm
              handleChangePic={handleChangePic}
              currentUserID={currentUserID}
              profilePicture={img}
              setImg={setImg}
            />
          </div>
        )}
      </div>

      <div
        onClick={connectionStatus === 'self' ? openDetailsForm : undefined}
        className={`ml-auto flex size-12 items-center justify-center rounded-full p-2 pt-4 ${hoverColorClass} cursor-pointer`}
      >
        {connectionStatus === 'self' ? (
          <EditOutlinedIcon sx={{ color: 'gray' }} fontSize='medium' />
        ) : (
          <NotificationsIcon sx={{ color: 'gray' }} fontSize='medium' />
        )}
      </div>
    </div>
  );
}

export default ProfileBanner;
