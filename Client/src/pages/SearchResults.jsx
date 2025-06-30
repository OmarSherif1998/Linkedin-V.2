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

  const { currentSection, sectionRefs, scrollToSection } = useSectionObserver([
    'University',
    'Posts',
    'Jobs',
    'People',
    'More People',
  ]);

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
        className={`flex justify-center gap-5 ${isMobile ? 'p-0' : 'min-h-screen px-[10%] py-4'} `}
      >
        {!isMobile && (
          <div className='fixed left-[10%] top-[5%em] w-[15%] self-start'>
            <OnThisPage
              currentSection={currentSection}
              scrollToSection={scrollToSection}
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
              <div ref={sectionRefs['More People']}>
                <UserResults
                  users={searchResults?.users || []}
                  morePeople={true}
                />{' '}
              </div>
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
