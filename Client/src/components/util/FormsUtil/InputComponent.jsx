/** @format */
const InputComponent = ({ value, onChange, placeholder }) => {
	return (
		<input
			type='text'
			value={value}
			onChange={onChange}
			className='border-[1.5px] border-gray-400 rounded-md px-4 w-[95%] font-thin'
			placeholder={placeholder}
		/>
	);
};

export default InputComponent;
