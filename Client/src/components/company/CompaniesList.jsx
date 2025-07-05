import { useQuery } from '@tanstack/react-query';
import { fetchSuggestedCompanies } from '../../api/companyAPI';
import LoadingSpinner from '../util/LoadingSpinner';
import useThemeClasses from '../../hooks/useThemeClasses';
import NewCompany from './NewCompany';
import useToken from '../../hooks/useToken';

function CompaniesList({ limit = 3, exclude = null }) {
  const { componentBGColorClass, borderClass, darkMode, textColorClass } =
    useThemeClasses();
  const token = useToken();
  const { data: companies, isLoading } = useQuery({
    queryKey: ['suggestedCompanies'],
    queryFn: () => fetchSuggestedCompanies(limit, exclude, token),
  });
  return (
    <div
      className={`${componentBGColorClass} ${borderClass} flex flex-col rounded-md border-gray-300 p-2 ${darkMode ? 'shadow-none' : 'shadow-xl'}`}
    >
      <h1
        className={`${darkMode ? textColorClass : 'text-gray-600'} p-2 text-base font-medium`}
      >
        People also viewed
      </h1>
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
                isFollowingFlag={company.isFollowing}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CompaniesList;
