/** @format */
const InputComponent = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-[95%] rounded-md border-[1.5px] border-gray-400 px-4 font-thin"
      placeholder={placeholder}
    />
  );
};

export default InputComponent;
