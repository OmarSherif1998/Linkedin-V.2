/** @format */

import BackButton from "./util/BackButton";
import SubSectionForm from "./SubSectionForm";

function SectionForm({ sectionTitle, sections = [], isMobile }) {
  return (
    <div className={`flex h-fit flex-col gap-5`}>
      {isMobile && <BackButton activeSection={sectionTitle} />}

      {sections.map(({ StaticDate, title }, i) => (
        <SubSectionForm key={i} StaticDate={StaticDate} title={title} />
      ))}
    </div>
  );
}

export default SectionForm;
