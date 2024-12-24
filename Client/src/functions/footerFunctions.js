/** @format */
import InputOption from '../components/Options/InputOption';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const ColumnList = ({ data }) => {
	return (
		<ul>
			{data.map((col, index) => (
				<li
					key={index}
					className={`hover:cursor-pointer ${
						col.title ? 'font-bold' : 'font-normal  hover:text-blue-900 '
					}`}
				>
					{col.name}
				</li>
			))}
		</ul>
	);
};
const SubColumnList = ({ data }) => {
	return (
		<ul className='flex gap-[0.5rem]  items-center  pl-[1.25rem]'>
			<li>
				<img
					src={require('../images/linkedin - black.png')}
					alt=''
					className='h-[1rem] mt-[0.25rem] w-[4.5rem]'
				/>
			</li>
			{data.map((col, index) => (
				<li
					key={index}
					className='font-normal cursor-pointer hover:text-blue-800'
				>
					{col.name}
				</li>
			))}
			<li>
				<InputOption Icon={KeyboardArrowDownIcon} />
			</li>
		</ul>
	);
};

export { ColumnList, SubColumnList };
