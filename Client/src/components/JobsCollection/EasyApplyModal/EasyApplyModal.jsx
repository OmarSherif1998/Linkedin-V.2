import { useState } from "react";
import { ApplyForJob } from "../../../api/jobsAPI";
import useThemeClasses from "../../../hooks/useThemeClasses";
import useUser from "../../../hooks/useUser";
import ContactInfo from "./ContactInfo";
import ContactInfoNav from "./ContactInfoNav";
import ContactInfoFooter from "./ContactInfoFooter";
import PersonalInfoStep from "./FormInputs/PersonalInfoStep ";
import SalaryExpectationsStep from "./FormInputs/SalaryExpectationsStep";
import DocumentsUploadStep from "./FormInputs/DocumentsUploadStep";
import ProfessionalInfoStep from "./FormInputs/ProfessionalInfoStep";

function EasyApplyModal({ onClose, jobName, jobID, companyName }) {
  const {
    id: userID,
    profilePicture,
    firstName,
    lastName,
    bio,
    location,
    city,
    email,
    phoneNumber,
    experiences,
  } = useUser();
  const { textColorClass, componentBGColorClass } = useThemeClasses();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const currentExperience = experiences?.find((exp) => exp.isCurrent);

  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    bio: bio,
    email: email || "",
    phone: phoneNumber || "",
    currentCompany: currentExperience?.companyName || "",
    currentPosition: currentExperience?.jobTitle || "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    yearsOfExperience: "",
    resumeUrl: "",
    coverLetter: "",
  });
  const steps = [
    "Personal Information",
    "Professional Details",
    "Compensation",
    "Documents",
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.firstName.trim())
        newErrors.firstName = "First name is required";
      if (!formData.lastName.trim())
        newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    }

    if (step === 2) {
      if (!formData.expectedSalary.trim())
        newErrors.expectedSalary = "Expected salary is required";
      if (!formData.noticePeriod.trim())
        newErrors.noticePeriod = "Notice period is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Unified input handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await ApplyForJob(
        formData,
        userID,
        email,
        jobName,
        jobID,
        companyName,
      );
      if (response && response.success) {
        console.log("Job application submitted successfully:", response);
        onClose();
      } else {
        throw new Error("Application submission failed");
      }
    } catch (error) {
      console.error("Error submitting job application:", error);
      alert("Failed to submit application. Please try again.");
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoStep
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            steps={steps[0]}
          />
        );
      case 1:
        return (
          <ProfessionalInfoStep
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            steps={steps[1]}
          />
        );
      case 2:
        return (
          <SalaryExpectationsStep
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            steps={steps[2]}
          />
        );
      case 3:
        return (
          <DocumentsUploadStep
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            steps={steps[3]}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div
      className={`fixed z-50 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-50`}
    >
      <div
        className={`${componentBGColorClass} ${textColorClass} relative mt-[3rem] flex h-[85vh] w-[40rem] flex-col justify-between gap-2 overflow-auto overscroll-auto rounded-lg p-4 align-bottom shadow-lg xl:h-[55vh]`}
      >
        <ContactInfoNav jobName={jobName} onClose={onClose} />
        <ContactInfo
          profilePicture={profilePicture}
          firstName={firstName}
          lastName={lastName}
          bio={bio}
          location={location}
          city={city}
        />
        {renderStepContent(activeStep)}
        <ContactInfoFooter
          pageNumber={activeStep}
          onNext={handleNext}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default EasyApplyModal;
