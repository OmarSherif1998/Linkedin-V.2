import useThemeClasses from '../../../hooks/useThemeClasses';

function PreferenceDropdown({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
}) {
  const { textColorClass, borderClass, componentBGColorClass } =
    useThemeClasses();
  return (
    <div>
      <label className={`mb-1 block text-sm font-medium ${textColorClass}`}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full rounded border ${componentBGColorClass} p-2 ${borderClass} ${textColorClass}`}
      >
        <option value='' disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className={`${textColorClass}`}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PreferenceDropdown;
