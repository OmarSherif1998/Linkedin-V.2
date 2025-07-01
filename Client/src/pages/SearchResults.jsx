import { useEffect, useRef, useState } from 'react';
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
import PostsResults from '../components/search/PostsResults';
import useSectionObserver from '../hooks/useSectionObserver';

function SearchResults() {
  const { _id } = useUser();
  const { searchParam } = useParams();
  const { isMobile, windowSize } = useScreenSize();
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['searchResults', searchParam],
    queryFn: () => Search(searchParam, _id),
  });

  const { currentSection, sectionRefs, scrollToSection } = useSectionObserver([
    'University',
    'Posts',
    'Jobs',
    'People',
    'More people',
    'People Also Viewed',
  ]);

  const results =
    searchResults?.message === 'No results found for your search.'
      ? false
      : true;
  const hasPeople = searchResults?.users?.length > 0;
  const hasMorePeople = searchResults?.users?.length > 3;
  const hasPosts = searchResults?.posts?.length > 0;
  const hasJobs = searchResults?.jobs?.length > 0;
  const hasSchools = !!searchResults?.university;
  const hasCompany = !!searchResults?.company;
  const hasPeopleViewed = !isMobile && windowSize < 1280;

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
        className={`flex justify-center gap-5 ${isMobile ? 'p-0' : 'min-h-screen py-4 xl:px-[5%] 2xl:px-[10%]'} `}
      >
        {!isMobile && !searchResults?.message && (
          <div className='fixed left-[1%] top-[5%em] hidden w-[15%] self-start lg:left-[2%] lg:block 2xl:left-[10%]'>
            <OnThisPage
              currentSection={currentSection}
              scrollToSection={scrollToSection}
              hasPeople={hasPeople}
              hasMorePeople={hasMorePeople}
              hasPosts={hasPosts}
              hasJobs={hasJobs}
              hasSchools={hasSchools}
              hasCompany={hasCompany}
              hasPeopleViewed={hasPeopleViewed}
            />
          </div>
        )}

        {results ? (
          //Main div
          <div
            className={`flex ${isMobile ? 'w-full gap-1' : 'gap-4 xl:w-[40%]'} flex-col`}
          >
            {hasCompany && !isLoading && (
              <div>
                <CompanyResults company={searchResults.company} />
              </div>
            )}

            {hasSchools && !isLoading && (
              <div ref={sectionRefs['University']}>
                <UniversityResults university={searchResults.university} />
              </div>
            )}

            {hasPeople && !isLoading && (
              <div ref={sectionRefs['People']}>
                <UserResults users={searchResults.users} morePeople={false} />
              </div>
            )}
            {hasPeopleViewed && (
              <div ref={sectionRefs['People Also Viewed']}>
                <PeopleAlsoViewed companyID={searchResults?.company?._id} />
              </div>
            )}
            {hasPosts && !isLoading && (
              <div ref={sectionRefs['Posts']}>
                <PostsResults posts={searchResults.posts} />
              </div>
            )}
            {hasJobs && !isLoading && (
              <div ref={sectionRefs['Jobs']}>
                <JobsResults jobs={searchResults.jobs} />
              </div>
            )}

            {hasMorePeople && !isLoading && (
              <div ref={sectionRefs['More people']}>
                <UserResults
                  users={searchResults?.users || []}
                  morePeople={true}
                />{' '}
              </div>
            )}
          </div>
        ) : (
          <div className='flex justify-center h-fit'>
            <NoSearchResults />
          </div>
        )}

        {!isMobile && windowSize >= 1280 && (
          <div className='w-[20%]'>
            <PeopleAlsoViewed companyID={searchResults?.company?._id} />
          </div>
        )}
      </section>
    </div>
  );
}

export default SearchResults;
