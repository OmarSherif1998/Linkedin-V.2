/** @format */
import { useEffect, useState } from 'react';
import { usePicForm } from '../../../hooks/usePicForm';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PicForm from '../PicForm';
import coverPic from '../../../images/coverPic.jpg';
import useThemeClasses from '../../../hooks/useThemeClasses';
import useScrollLock from '../../../hooks/useScrollLock';

function ProfileBanner({
  coverPicture,
  profilePicture,
  currentUserID,
  type,
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
    <div className={`${type === 'Me' ? 'mb-5' : 'mb-12'} flex flex-col`}>
      <div className='relative h-[7rem] md:h-[12rem] lg:h-[15rem] 2xl:h-[22rem]'>
        <img
          src={coverPicture ? coverPicture : coverPic}
          alt='coverPicture'
          className='object-cover w-full h-full rounded-t-md'
        />

        <img
          src={img}
          alt='profilePicture'
          className={
            'absolute left-[2%] top-[50%] z-30 size-[5rem] cursor-pointer rounded-full border-[0.3rem] bg-white object-cover md:size-[8rem] lg:size-[10rem] 2xl:size-[15rem]'
          }
          onClick={type === 'Me' ? handleChangePic : undefined}
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
        onClick={type === 'Me' ? openDetailsForm : undefined}
        className={`ml-auto flex h-12 w-12 items-center justify-center rounded-full p-2 pt-4 ${
          type === 'Me'
            ? `${hoverColorClass} cursor-pointer`
            : 'pointer-events-none opacity-0'
        }`}
      >
        <EditOutlinedIcon sx={{ color: 'gray' }} fontSize='medium' />
      </div>
    </div>
  );
}

export default ProfileBanner;
