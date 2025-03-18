/** @format */

const TextAreaComponent = ({ value, placeholder, height, onChange }) => (
  <textarea
    value={value}
    onChange={onChange}
    className={`w-[95%] rounded-md border-[1.5px] border-gray-400 px-4 font-thin h-${height} `}
    placeholder={placeholder}
  />
);

export default TextAreaComponent;
