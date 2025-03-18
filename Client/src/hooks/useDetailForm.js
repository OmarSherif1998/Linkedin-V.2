/** @format */

// Custom Hook (useDetailForm.js)
import { useState } from "react";

function useDetailForm(currentUser) {
  const [firstName, setFirstName] = useState(currentUser.firstName || "");
  const [lastName, setLastName] = useState(currentUser.lastName || "");
  const [bio, setBio] = useState(currentUser.bio || "");
  const [jobTitle, setJobTitle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);
  const [institutionName, setInstitutionName] = useState("");
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [educationStartDate, setEducationStartDate] = useState("");
  const [educationEndDate, setEducationEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [educationDescription, setEducationDescription] = useState("");
  const [activities, setActivities] = useState("");
  const [location, setLocation] = useState(currentUser.location || "");
  const [locationType, setLocationType] = useState();
  const [city, setCity] = useState(currentUser.city || "");
  const [isDetailsForm, setIsDetailsForm] = useState(false);
  const [isExperienceForm, setIsExperienceForm] = useState(false);
  const [isPersonalForm, setIsPersonalForm] = useState(false);
  const [isEducationForm, setIsEducationForm] = useState(false);

  const openDetailsForm = () => {
    setIsDetailsForm(true);
    setIsPersonalForm(true);
  };
  const closeForm = () => {
    setIsDetailsForm(false);
    setIsPersonalForm(false);
    setIsExperienceForm(false);
    setIsEducationForm(false);
  };

  const openExperienceForm = () => {
    setIsPersonalForm(false);
    setIsExperienceForm(true);
  };
  const openEducationForm = () => {
    setIsPersonalForm(false);
    setIsEducationForm(true);
  };

  return {
    PersonalInfo: {
      firstName,
      lastName,
      bio,
      location,
      city,
    },
    ExperienceInfo: {
      jobTitle,
      employmentType,
      companyName,
      startDate,
      endDate,
      location,
      locationType,
      description,
      isCurrent,
    },
    EducationInfo: {
      institutionName,
      degree,
      major,
      educationStartDate,
      educationEndDate,
      grade,
      educationDescription,
      activities,
    },
    setters: {
      setFirstName,
      setLastName,
      setBio,
      setJobTitle,
      setEmploymentType,
      setCompanyName,
      setStartDate,
      setEndDate,
      setDescription,
      setIsCurrent,
      setLocation,
      setLocationType,
      setCity,
      setInstitutionName,
      setDegree,
      setMajor,
      setEducationStartDate,
      setEducationEndDate,
      setGrade,
      setEducationDescription,
      setActivities,
    },
    forms: {
      isDetailsForm,
      isExperienceForm,
      isPersonalForm,
      isEducationForm,
      openDetailsForm,
      openExperienceForm,
      openEducationForm,
      closeForm,
    },
  };
}

export { useDetailForm };
