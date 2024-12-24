/** @format */

const AnalyticsSection = ({
	icon: Icon,
	title,
	description,
	additionalInfo,
}) => {
	const random = Math.floor(Math.random() * 100);
	return (
		<div className='w-full p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:bg-gray-100'>
			<section className='flex gap-1 '>
				<Icon />
				<h1 className='text-lg font-semibold'>
					{random + ' '}
					{title}
				</h1>
			</section>
			<p className='text-gray-500'>
				{description}
				{additionalInfo && <br />}
				{additionalInfo && (
					<span className='text-sm text-gray-400'>{additionalInfo}</span>
				)}
			</p>
		</div>
	);
};

export default AnalyticsSection;
