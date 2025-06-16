import useThemeClasses from "../../../../hooks/useThemeClasses";

function DocumentsUploadStep({ formData, handleInputChange, steps }) {
  const { textColorClass } = useThemeClasses();

  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      // Here you would handle file upload logic
      // For now, just store the file name
      handleInputChange(field, file.name);
    }
  };

  return (
    <div className="mt-2 flex flex-col gap-1">
      <h1 className={`${textColorClass} font-semibold`}>{steps + ":"}</h1>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => handleFileUpload("resumeUrl", e)}
          className="w-full"
        />
        {formData.resumeUrl && <span>Selected: {formData.resumeUrl}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Cover Letter (Optional)</label>
        <textarea
          value={formData.coverLetter}
          onChange={(e) => handleInputChange("coverLetter", e.target.value)}
          className="h-32 w-full rounded-md border border-gray-300 p-2"
        />
      </div>
    </div>
  );
}
export default DocumentsUploadStep;
