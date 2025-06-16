import { useQuery } from "@tanstack/react-query";
import { fetchSuggestedCompanies } from "../../api/companyAPI";
import LoadingSpinner from "../util/LoadingSpinner";
import useThemeClasses from "../../hooks/useThemeClasses";
import NewCompany from "./NewCompany";

function CompaniesList() {
  const { componentBGColorClass, borderClass } = useThemeClasses();

  const { data: companies, isLoading } = useQuery({
    queryKey: ["suggestedCompanies"],
    queryFn: fetchSuggestedCompanies,
  });
  return (
    <div
      className={`${componentBGColorClass} ${borderClass} flex h-fit flex-col rounded-md border-gray-300 p-2 shadow-xl`}
    >
      <div className="flex flex-col p-2">
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
