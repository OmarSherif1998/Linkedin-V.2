import { useState } from 'react';
import useThemeClasses from '../../hooks/useThemeClasses';
import ProfileCardButtons from '../util/ProfileCardButtons';
import CompanyInfo from './CompanyInfo';
import { followCompany, unfollowCompany } from '../../api/companyAPI';
import useUser from '../../hooks/useUser';

function CompanyInfoHeader({
  companyID,
  companyName,
  bio,
  city,
  location,
  followers,
  industry,
  size,
  isFollowing,
}) {
  const { _id: userID } = useUser();
  const { textColorClass } = useThemeClasses();
  const [FollowingFlag, setFollowingFlag] = useState(isFollowing);

  const handleFollowingAction = async () => {
    try {
      if (!FollowingFlag) {
        setFollowingFlag(true);
        await followCompany(userID, companyID);
      } else {
        setFollowingFlag(false);
        await unfollowCompany(userID, companyID);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${textColorClass} flex flex-col gap-2 sm:mt-3 md:mt-3 lg:mt-2 xl:mt-1 2xl:mt-10`}
    >
      <div className={`flex justify-between`}>
        <CompanyInfo
          companyName={companyName}
          bio={bio}
          city={city}
          location={location}
          followers={followers}
          industry={industry}
          size={size}
        />
      </div>
      <ProfileCardButtons
        onFollow={handleFollowingAction}
        isFollowing={FollowingFlag}
        buttonText={'invite'}
        Icon={null}
      />
    </div>
  );
}

export default CompanyInfoHeader;
