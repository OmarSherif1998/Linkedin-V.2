/** @format */

const WebsiteInfo = () => (
	<div className='flex flex-col gap-3'>
		<div>
			{' '}
			<h1 className='text-xl font-semibold'>Website</h1>
			<span className='font-semibold text-gray-500'>
				Add a link that will appear at the top of your profile{' '}
			</span>
		</div>
		<div className='flex flex-col'>
			<span>Link</span>
			<input
				type='text'
				className='border-[1.5px] border-gray-400 rounded-md px-4 w-[95%] font-thin '
			/>
		</div>
	</div>
);

export default WebsiteInfo;
