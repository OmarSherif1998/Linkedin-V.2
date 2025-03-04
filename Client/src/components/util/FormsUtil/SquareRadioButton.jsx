/** @format */

const SquareCheckbox = ({
	name,
	value,
	onChange,
	label,
	checked,
	setChecked,
}) => {
	return (
		<div className='flex items-center text-white'>
			<input
				type='checkbox'
				id={value}
				name={name}
				value={value}
				checked={checked}
				onChange={() => setChecked((prev) => !prev)}
				className="w-5 h-5 border-2 border-black rounded-md appearance-none checked:bg-green-600 checked:border-green-600 checked:before:content-['✓']  checked:before:absolute checked:before:text-white checked:before:text-md checked:before:font-semibold flex items-center justify-center "
			/>
			<label htmlFor={value} className='ml-2 font-thin text-black'>
				{label}
			</label>
		</div>
	);
};

export default SquareCheckbox;
