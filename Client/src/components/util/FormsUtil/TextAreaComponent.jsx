/** @format */

const TextAreaComponent = ({ value, placeholder, height, onChange }) => (
	<textarea
		value={value}
		onChange={onChange}
		className={`border-[1.5px] border-gray-400 rounded-md px-4 w-[95%] font-thin h-${height} `}
		placeholder={placeholder}
	/>
);

export default TextAreaComponent;
