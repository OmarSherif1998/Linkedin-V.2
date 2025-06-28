import useThemeClasses from '../../hooks/useThemeClasses';
import CompanyCardButtons from './CompanyCardButtons';
import CompanyInfo from './CompanyInfo';

function CompanyInfoHeader({
  companyName,
  bio,
  city,
  location,
  followers,
  industry,
  size,
}) {
  const { textColorClass } = useThemeClasses();
  return (
    <div
      className={`${textColorClass} mt-5 flex flex-col gap-2 md:mt-10 lg:mt-12 2xl:mt-20`}
    >
      <h1
        className={`${textColorClass} truncate text-sm font-semibold md:text-2xl`}
      >
        {companyName}
      </h1>

      <div className={`flex justify-between`}>
        <CompanyInfo
          bio={bio}
          city={city}
          location={location}
          followers={followers}
          industry={industry}
          size={size}
        />
      </div>
      <CompanyCardButtons />
    </div>
  );
}

export default CompanyInfoHeader;
