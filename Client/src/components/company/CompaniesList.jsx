import { useQuery } from '@tanstack/react-query';
import { fetchSuggestedCompanies } from '../../api/companyAPI';
import LoadingSpinner from '../util/LoadingSpinner';
import useThemeClasses from '../../hooks/useThemeClasses';
import NewCompany from './NewCompany';

function CompaniesList({ limit = 3, exclude = null }) {
  const { componentBGColorClass, borderClass, darkMode } = useThemeClasses();

  const { data: companies, isLoading } = useQuery({
    queryKey: ['suggestedCompanies'],
    queryFn: () => fetchSuggestedCompanies(limit, exclude),
  });
  return (
    <div
      className={`${componentBGColorClass} ${borderClass} flex flex-col rounded-md border-gray-300 p-2 ${darkMode ? 'shadow-none' : 'shadow-xl'}`}
    >
      <div className='flex flex-col p-2'>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          companies?.map((comapny, index) => (
            <div key={index}>
              <NewCompany
                profilePicture={comapny.profilePicture}
                Name={comapny.name}
                bio={comapny.bio}
                comapnyID={comapny._id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CompaniesList;
