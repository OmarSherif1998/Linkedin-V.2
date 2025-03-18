/** @format */

import React, { useState } from "react";
import FormNav from "../../../util/FormsUtil/FormNav";
import InputComponent from "../../../util/FormsUtil/InputComponent";
import LabelComponent from "../../../util/FormsUtil/LabelComponent";
import DropdownComponent from "../../../util/FormsUtil/DropDownComponent";
import { Months, Years } from "../../../../staticData/FormStaticData";

function EducationForm({ closeForm, submitChanges, EducationInfo, setters }) {
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const dates = {
    startDate: `${startMonth}, ${startYear}`,
    endDate: `${endMonth}, ${endYear}`,
  };

  return (
    <div className="flex h-[30rem] w-[45rem] flex-col gap-5 overflow-auto rounded-lg bg-white p-6 shadow-lg">
      <FormNav
        Title="Add Education"
        formVersion=" education"
        closeForm={closeForm}
      />
      <section>
        <LabelComponent required={true} label={"School"} />
        <InputComponent
          onChange={(e) => setters.setInstitutionName(e.target.value)}
          placeholder={"Ex: The British University in Egypt"}
        />
      </section>
      <section>
        <LabelComponent required={true} label={"Degree"} />
        <InputComponent
          onChange={(e) => setters.setDegree(e.target.value)}
          placeholder={"Ex: Masters "}
        />
      </section>
      <section>
        <LabelComponent required={true} label={"Filed of study"} />
        <InputComponent
          onChange={(e) => setters.setMajor(e.target.value)}
          placeholder={"Ex: Computer Science"}
        />
      </section>
      <section>
        <LabelComponent label={"Start date"} required={true} />
        <div className="flex gap-3">
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
        <LabelComponent label={"End date (or expected)"} />
        <div className="flex gap-3">
          <DropdownComponent
            options={Months}
            onChange={(e) => setEndMonth(e.target.value)}
          />
          <DropdownComponent
            options={Years}
            onChange={(e) => setEndYear(e.target.value)}
          />
        </div>
      </section>
      <section>
        <LabelComponent label={"Grade"} />
        <InputComponent
          onChange={(e) => setters.setGrade(e.target.value)}
          placeholder={"Ex: GPA 3.7"}
        />
      </section>
      <div className="flex border-t border-gray-400 pt-5">
        <button
          onClick={() => submitChanges(EducationInfo, "Education Form", dates)} // Don't forget to add an object that contains all the values of the form
          className="hover:blue-900 ml-auto w-[15%] rounded-xl bg-LinkedInBlue p-2 font-semibold text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EducationForm;
