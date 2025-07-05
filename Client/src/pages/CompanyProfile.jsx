import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyData } from '../api/companyAPI';
import CompanyCard from '../components/company/CompanyCard';
import CompanyOverview from '../components/company/CompanyOverview';
import CompanySection from '../components/company/CompanySection';
import LoadingScreen from '../components/util/LoadingScreen';
import useToken from '../hooks/useToken';
import CompaniesList from '../components/company/CompaniesList';

function CompanyProfile() {
  const { companyID } = useParams();
  const token = useToken();
  const [activeSection, setActiveSection] = useState('Home');
  const { data: CompanyData, isLoading } = useQuery({
    queryKey: ['companyData', companyID],
    queryFn: () => fetchCompanyData(companyID, token),
    enabled: !!companyID, // Only run the query if companyID is available
  });

  console.log('Called');
  if (isLoading) return <LoadingScreen />;
  return (
    <div className='flex justify-between lg:px-[5%] xl:px-[10%] 2xl:px-[20%]'>
      <div className='mx-auto flex min-h-screen w-full flex-col gap-3 pb-10 lg:w-[70%] lg:gap-4'>
        <section>
          <CompanyCard CompanyData={CompanyData} />
          <CompanySection
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </section>
        <CompanyOverview
          website={CompanyData?.website}
          overview={CompanyData?.overview}
          ticker={CompanyData?.ticker}
        />
      </div>
      <div className='hidden h-fit w-[25%] lg:flex'>
        <CompaniesList limit={4} exclude={CompanyData._id} />
      </div>
    </div>
  );
}

export default CompanyProfile;
