import useThemeClasses from "../../../../hooks/useThemeClasses";

function PersonalInfoStep({ formData, handleInputChange, steps, errors }) {
  const { textColorClass, componentBGColorClass } = useThemeClasses();

  const fields = [
    { key: "firstName", label: "First Name", required: true },
    { key: "lastName", label: "Last Name", required: true },
    { key: "email", label: "Email Address", required: true },
    { key: "phone", label: "Phone Number", required: true },
  ];

  return (
    <div className="mt-3 flex flex-col gap-1">
      <h1 className={`${textColorClass} font-semibold`}>{steps + ":"}</h1>
      {fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-1">
          <label
            htmlFor={field.key}
            className="flex gap-1 text-[10px] text-gray-400"
          >
            <p> {field.label}</p>
            {field.required ? <p className="text-red-500"> *</p> : null}
          </label>
          <input
            required={field.required}
            id={field.key}
            name={field.key}
            value={formData[field.key]}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className={`${componentBGColorClass} ${textColorClass} w-full rounded-md border border-gray-300 px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors[field.key] && (
            <span className="text-xs text-red-500">{errors[field.key]}</span>
          )}
        </div>
      ))}
    </div>
  );
}
export default PersonalInfoStep;
