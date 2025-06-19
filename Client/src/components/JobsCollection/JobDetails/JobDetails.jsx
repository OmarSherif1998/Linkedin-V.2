import { useEffect } from 'react';
import useThemeClasses from '../../../hooks/useThemeClasses';
import AboutTheJob from './AboutTheJob';
import JobActions from './JobActions';
import JobBadges from './JobBadges';
import JobDetailsHeader from './JobDetailsHeader';
import JobPremiumSection from './JobPremiumSection';
import JobTitleSection from './JobTitleSection';
import JobDetailsSkeleton from '../Skeletons/JobDetailsSkeleton';

function JobDetails({
  activeJobDetails,
  isLoading,
  openEasyApplyModal,
  hasApplied,
}) {
  const { componentBGColorClass } = useThemeClasses();

  return (
    <div
      className={`${componentBGColorClass} flex w-full flex-col gap-5 overflow-auto p-5`}
    >
      {isLoading ? (
        <JobDetailsSkeleton />
      ) : (
        <>
          {' '}
          <JobDetailsHeader
            profilePicture={activeJobDetails?.company.profilePicture}
            name={activeJobDetails?.company.name}
          />
          <JobTitleSection
            title={activeJobDetails?.title}
            city={activeJobDetails?.location.city}
            country={activeJobDetails?.location.country}
            createdAt={activeJobDetails?.createdAt}
          />
          <JobBadges
            isRemote={activeJobDetails?.isRemote}
            type={activeJobDetails?.type}
          />
          <JobActions
            isEasyApply={activeJobDetails?.isEasyApply}
            website={activeJobDetails?.company.website}
            openEasyApplyModal={openEasyApplyModal}
            hasApplied={hasApplied}
          />
          <JobPremiumSection />
          <AboutTheJob
            name={activeJobDetails?.company.name}
            bio={activeJobDetails?.company.bio}
            description={activeJobDetails?.description}
            overview={activeJobDetails?.company.overview}
            city={activeJobDetails?.location.city}
            country={activeJobDetails?.location.country}
            qualifications={activeJobDetails?.qualifications}
            responsibilities={activeJobDetails?.responsibilities}
            skills={activeJobDetails?.skills}
          />
        </>
      )}
    </div>
  );
}

export default JobDetails;
