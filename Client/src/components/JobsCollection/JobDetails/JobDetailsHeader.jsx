import TurnRightIcon from '@mui/icons-material/TurnRight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useThemeClasses from '../../../hooks/useThemeClasses';
import CloseIcon from '@mui/icons-material/Close';

function JobDetailsHeader({ profilePicture, name, onClose }) {
  const { textColorClass } = useThemeClasses();

  return (
    <section className={`${textColorClass} flex items-center justify-between`}>
      <section className='flex items-center gap-2 font-semibold'>
        <img src={profilePicture} alt='companyLogo' className='size-12' />{' '}
        <h1>{name}</h1>
      </section>
      <section className='flex gap-4'>
        <TurnRightIcon />
        <MoreHorizIcon />
        <CloseIcon
          className={`ml-auto ${textColorClass} cursor-pointer`}
          onClick={onClose}
        />
      </section>
    </section>
  );
}

export default JobDetailsHeader;
