import useThemeClasses from '../../hooks/useThemeClasses';
import CompanyBanner from './CompanyBanner';
import CompanyInfoHeader from './CompanyInfoHeader';

function CompanyCard({ CompanyData }) {
  const { componentBGColorClass, borderClass } = useThemeClasses();
  // console.log(CompanyData, "CompanyData in CompanyCard");
  const {
    _id,
    coverPicture,
    profilePicture,
    bio,
    location,
    name,
    followers,
    industry,
    size,
    isFollowing,
  } = CompanyData;
  return (
    <div
      className={`${componentBGColorClass} w-full flex-col pb-[3%] md:flex lg:rounded-t-md CustomScreen:m-auto md:${borderClass} `}
    >
      <CompanyBanner
        coverPicture={coverPicture}
        profilePicture={profilePicture}
      />
      <div className='ml-2 flex flex-col md:ml-5'>
        <CompanyInfoHeader
          companyID={_id}
          companyName={name}
          bio={bio}
          city={location?.city}
          location={location?.country}
          followers={followers}
          industry={industry}
          size={size}
          isFollowing={isFollowing}
        />
      </div>
    </div>
  );
}

export default CompanyCard;
