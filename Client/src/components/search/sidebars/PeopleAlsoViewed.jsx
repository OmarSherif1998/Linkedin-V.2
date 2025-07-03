import { useQuery } from '@tanstack/react-query';
import { fetchSuggestedCompanies } from '../../../api/companyAPI';
import useThemeClasses from '../../../hooks/useThemeClasses';
import LoadingSpinner from '../../util/LoadingSpinner';
import NewCompany from '../../company/NewCompany';
import useToken from '../../../hooks/useToken';

function PeopleAlsoViewed({ companyID }) {
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const token = useToken();
  const { data: companies, isLoading } = useQuery({
    queryKey: ['suggestedCompanies'],
    queryFn: () => fetchSuggestedCompanies(5, companyID, token),
  });

  return (
    <div className={`${componentBGColorClass} h-fit rounded-lg p-5`}>
      <h1 className={`${textColorClass} text-xl font-semibold`}>
        {' '}
        People also viewed
      </h1>
      <div className={`flex flex-col rounded-md p-2`}>
        <div className='flex flex-col p-2'>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            companies?.map((company, index) => (
              <div key={index}>
                <NewCompany
                  profilePicture={company.profilePicture}
                  Name={company.name}
                  bio={company.bio}
                  companyID={company._id}
                  followers={company.followers}
                  isFollowingFlag={company?.isFollowing}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PeopleAlsoViewed;
