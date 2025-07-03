import React from 'react';

function ConnectionButtons() {
  return (
    <div>
      {' '}
      <div className='mt-2 flex flex-wrap gap-2 sm:gap-3'>
        <button className='h-[2rem] w-fit rounded-full bg-LinkedInBlue px-4 text-white transition-colors hover:bg-blue-900 sm:px-5'>
          Message
        </button>
        <button className='h-[2rem] w-fit rounded-full border border-LinkedInBlue px-4 text-LinkedInBlue transition-colors hover:bg-gray-100 sm:px-5'>
          More
        </button>
      </div>
    </div>
  );
}

export default ConnectionButtons;
