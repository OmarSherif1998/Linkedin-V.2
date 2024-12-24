/** @format */

const LabelComponent = ({ label, required }) => (
	<label className='text-gray-400 '>
		{label}
		{required && <span className='text-red-500 '> *</span>}
	</label>
);

export default LabelComponent;
