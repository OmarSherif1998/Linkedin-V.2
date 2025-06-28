import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Search } from '../api/searchAPI';
import { mainFilters } from '../staticData/SearchData';
import SearchFilter from '../components/search/util/SearchFilter';
import useUser from '../hooks/useUser';
import UserResults from '../components/search/UserResults';
import CompanyResults from '../components/search/CompanyResults';
import JobsResults from '../components/search/JobsResults';
import UniversityResults from '../components/search/UniversitiesResults';
import NoSearchResults from '../components/search/NoSearchResults';
import OnThisPage from '../components/search/sidebars/OnThisPage';
import PeopleAlsoViewed from '../components/search/sidebars/PeopleAlsoViewed';
import LoadingSpinner from '../components/util/LoadingSpinner';
import useScreenSize from '../hooks/useScreenSize';

function SearchResults() {
  const { _id } = useUser();
  const { searchParam } = useParams();
  const { isMobile } = useScreenSize();
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['searchResults', searchParam],
    queryFn: () => Search(searchParam, _id),
  });
  const results =
    searchResults?.message === 'No results found for your search.'
      ? false
      : true;
  const hasPeople = searchResults?.users?.length > 0;
  const hasMorePeople = searchResults?.users.length > 3;
  const hasPosts = searchResults?.posts.length > 0;
  const hasJobs = searchResults?.jobs.length > 0;
  const hasSchools = !!searchResults?.university;
  const hasCompany = !!searchResults?.company;
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className='w-full min-h-screen'>
      <SearchFilter
        filters={mainFilters}
        justify={'justify-center'}
        border='border-y'
      />
      <section
        className={`flex justify-center gap-5 ${isMobile ? 'p-0' : 'px-[10%] py-4'} `}
      >
        {!isMobile && (
          <div className='w-[15%]'>
            <OnThisPage
              hasPeople={hasPeople}
              hasMorePeople={hasMorePeople}
              hasPosts={hasPosts}
              hasJobs={hasJobs}
              hasSchools={hasSchools}
              hasCompany={hasCompany}
            />
          </div>
        )}

        {results ? (
          <div
            className={`flex ${isMobile ? 'w-full gap-1' : 'w-[40%] gap-4'} flex-col`}
          >
            {hasCompany && !isLoading && (
              <CompanyResults company={searchResults.company} />
            )}

            {hasSchools && !isLoading && (
              <UniversityResults university={searchResults?.university || []} />
            )}

            {hasPeople && !isLoading && (
              <UserResults
                users={searchResults?.users || []}
                morePeople={false}
              />
            )}
            {hasJobs && !isLoading && (
              <JobsResults jobs={searchResults?.jobs || []} />
            )}

            {hasMorePeople && !isLoading && (
              <UserResults
                users={searchResults?.users || []}
                morePeople={true}
              />
            )}
          </div>
        ) : (
          <div className='flex items-center justify-center'>
            <NoSearchResults />
          </div>
        )}

        {!isMobile && (
          <div className='w-[20%]'>
            <PeopleAlsoViewed companyID={searchResults?.company?._id} />
          </div>
        )}
      </section>
    </div>
  );
}

export default SearchResults;
