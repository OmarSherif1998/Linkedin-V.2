import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUniversityData } from '../api/universityAPI';

import LoadingScreen from '../components/util/LoadingScreen';
import UniversityCard from '../components/university/UniversityCard';
import UniversitySection from '../components/university/UniversitySection';
import UniversityOverview from '../components/university/UniversityOverview';

function UniversityProfile() {
  const { universityID } = useParams();
  const [activeSection, setActiveSection] = useState('Home');
  const { data: UniversityData, isLoading } = useQuery({
    queryKey: ['universityData', universityID],
    queryFn: () => fetchUniversityData(universityID),
    enabled: !!universityID, // Only run the query if universityID is available
  });
  if (isLoading) return <LoadingScreen />;
  return (
    <div className='mx-auto flex min-h-screen w-full flex-col gap-1 pb-10 lg:w-[70%] lg:gap-4'>
      <section>
        <UniversityCard UniversityData={UniversityData} />
        <UniversitySection
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </section>

      <UniversityOverview overview={UniversityData?.overview} />
    </div>
  );
}

export default UniversityProfile;
