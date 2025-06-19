import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className='w-30 flex items-center gap-2 rounded-md bg-gray-300 p-1 md:w-72'>
      <SearchIcon className='text-gray-500' />
      <input
        type='text'
        placeholder='Search...'
        className='w-full bg-transparent outline-none'
      />
    </div>
  );
}

export default SearchBar;
