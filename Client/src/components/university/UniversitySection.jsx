import useThemeClasses from '../../hooks/useThemeClasses';

function UniversitySection({ setActiveSection, activeSection }) {
  const sections = ['Home', 'About', 'Post', 'Jobs', 'Alumni'];
  const { componentBGColorClass, darkMode } = useThemeClasses();
  return (
    <div
      className={`${componentBGColorClass} flex space-x-3 rounded-b-md pl-2 pt-1 md:space-x-6`}
    >
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setActiveSection(section)}
          className={`px-2 py-2 text-xs font-medium md:px-4 md:text-base ${
            activeSection === section
              ? 'border-b-2 border-green-600 text-green-600'
              : `${darkMode ? 'text-white' : 'text-gray-600'} hover:text-green-600`
          }`}
        >
          {section}
        </button>
      ))}
    </div>
  );
}

export default UniversitySection;
