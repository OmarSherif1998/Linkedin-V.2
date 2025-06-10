import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCompanyData } from "../api/companyAPI";
import CompanyCard from "../components/Company/CompanyCard";
import LoadingScreen from "../components/util/LoadingScreen";
import CompanyOverview from "../components/Company/CompanyOverview";
import CompanySection from "../components/Company/CompanySection";
import { useState } from "react";

function CompanyProfile() {
  const { companyID } = useParams();
  const [activeSection, setActiveSection] = useState("Home");
  const { data: CompanyData, isLoading } = useQuery({
    queryKey: ["companyData", companyID],
    queryFn: () => fetchCompanyData(companyID),
    enabled: !!companyID, // Only run the query if companyID is available
  });

  if (isLoading) return <LoadingScreen />;
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col gap-1 pb-10 lg:w-[70%] lg:gap-4">
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
  );
}

export default CompanyProfile;
