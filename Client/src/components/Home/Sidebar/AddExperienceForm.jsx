import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCompaniesData } from '../../../api/companyAPI';
import { Checkbox } from '@mui/material';
import {
  descriptionPlaceholder,
  locationTypes,
  Months,
  options,
  Years,
} from '../../../staticData/FormStaticData';
import useThemeClasses from '../../../hooks/useThemeClasses';
import FormNav from '../../util/FormsUtil/FormNav';
import LabelComponent from '../../util/FormsUtil/LabelComponent';
import InputComponent from '../../util/FormsUtil/InputComponent';
import DropdownComponent from '../../util/FormsUtil/DropDownComponent';
import TextAreaComponent from '../../util/FormsUtil/TextAreaComponent';
import { updateUserExperience } from '../../../api/userAPI';
import useUser from '../../../hooks/useUser';

function AddExperienceForm({ setIsFormOpen }) {
  const { _id } = useUser();
  const { componentBGColorClass, textColorClass } = useThemeClasses();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [companyInput, setCompanyInput] = useState({
    companyName: '',
    _id: '',
  });
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState('');
  const [description, setDescription] = useState('');

  const dates = {
    startDate: `${startMonth}, ${startYear}`,
    endDate: endMonth && endYear ? `${endMonth}, ${endYear}` : 'Present',
  };

  const { data: companyData } = useQuery({
    queryKey: ['companyData'],
    queryFn: fetchCompaniesData,
  });
  const handleSubmit = async (dates) => {
    const experienceData = {
      jobTitle,
      employmentType,
      company: companyInput._id,
      dates,
      location,
      locationType,
      description,
    };
    setIsFormOpen(false); // Close the form after submission

    await updateUserExperience({
      _id: _id,
      experience: experienceData,
    });
  };
  const filteredCompanies = useMemo(() => {
    console.log(companyInput.companyName);
    if (!companyInput.companyName?.trim()) return [];
    return companyData?.filter((company) =>
      company.name
        .toLowerCase()
        .includes(companyInput.companyName.toLowerCase()),
    );
  }, [companyInput.companyName, companyData]);

  return (
    <div
      className={`${componentBGColorClass} flex h-[30rem] w-[45rem] flex-col gap-5 overflow-auto rounded-lg p-6 shadow-lg`}
    >
      <FormNav
        closeForm={() => setIsFormOpen(false)}
        Title='Add a new experience'
        formVersion=' job'
      />

      <section>
        <LabelComponent label={'Title'} required={true} />
        <InputComponent
          placeholder={'Ex: Retail Sales Manager'}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </section>
      <section className='flex flex-col'>
        <LabelComponent label={'Employment Type'} required={false} />
        <DropdownComponent
          options={options}
          onChange={(e) => setEmploymentType(e.target.value)}
          disabled={false}
        />
      </section>
      <section>
        <LabelComponent label={'Company or organization'} required={true} />
        <InputComponent
          placeholder={'Ex: Capgemini'}
          value={companyInput.companyName}
          onChange={(e) => {
            setCompanyInput({
              companyName: e.target.value,
            });
            setIsDropDownOpen(true);
          }}
        />
        {filteredCompanies?.length > 0 && isDropDownOpen && (
          <ul
            className={`z-10 mt-2 max-h-48 w-full overflow-auto rounded-md border ${componentBGColorClass} shadow-md`}
          >
            {filteredCompanies.map((company) => (
              <li
                key={company._id}
                onClick={() => {
                  setCompanyInput({
                    companyName: company.name,
                    _id: company._id,
                  });
                  setIsDropDownOpen(false);
                }}
                className={`flex cursor-pointer items-center gap-3 px-4 py-2 hover:bg-gray-100 hover:text-black ${textColorClass}`}
              >
                <img
                  src={company.profilePicture}
                  alt={company.name}
                  className='h-6 w-6 rounded-full object-cover'
                />
                <span>{company.name}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className='flex items-center'>
        <Checkbox
          color='success'
          checked={checked}
          onClick={() => {
            setChecked(!checked);
          }}
        />
        <p className={`${textColorClass}`}>
          I am currently working in this role
        </p>
      </section>
      <section>
        <LabelComponent label={'Start date'} required={true} />
        <div className='flex gap-3'>
          <DropdownComponent
            options={Months}
            onChange={(e) => setStartMonth(e.target.value)}
          />
          <DropdownComponent
            options={Years}
            onChange={(e) => setStartYear(e.target.value)}
          />
        </div>
      </section>

      <section>
        <LabelComponent label={'End date'} />
        <div className='flex gap-3'>
          <DropdownComponent
            options={Months}
            disabled={checked}
            onChange={(e) => setEndMonth(e.target.value)}
          />
          <DropdownComponent
            options={Years}
            disabled={checked}
            onChange={(e) => setEndYear(e.target.value)}
          />
        </div>
      </section>
      <section>
        <LabelComponent label={'Location'} />
        <InputComponent
          placeholder={'Ex: London, United Kingdom'}
          onChange={(e) => setLocation(e.target.value)}
        />
      </section>
      <section>
        <LabelComponent label={'Location Type'} />
        <DropdownComponent
          options={locationTypes}
          onChange={(e) => setLocationType(e.target.value)}
        />
      </section>
      <section>
        <LabelComponent label={'Description'} />
        <TextAreaComponent
          height={'20'}
          placeholder={descriptionPlaceholder}
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>
      <div className='flex border-t border-gray-400 pt-5'>
        <button
          onClick={() => handleSubmit(dates)} // Don't forget to add an object that contains all the values of the form
          className='hover:blue-900 ml-auto w-[15%] rounded-xl bg-LinkedInBlue p-2 font-semibold text-white'
        >
          Save
        </button>
      </div>
    </div>
  );
}
export default AddExperienceForm;
