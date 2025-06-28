import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useNavigation from './useNavigation';

const useSearch = () => {
  const { NavigateToSearch } = useNavigation();
  const location = useLocation();
  const pathName = location.pathname;
  const [searchParams, setSearchParams] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchParams.length > 0) {
      NavigateToSearch(searchParams);
      setShowDropdown(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchParams(e.target.value);
    if (e.target.value.length > 0) {
      setShowDropdown(true);
      // Optionally, update searchResults here for live suggestions
      setSearchResults([`Suggestion for "${e.target.value}"`]);
    } else {
      setShowDropdown(false);
      setSearchResults([]);
    }
  };

  const handleDropdownBlur = () => {
    // Delay hiding dropdown to allow click events
    setTimeout(() => setShowDropdown(false), 150);
  };

  return {
    searchParams,
    showDropdown,
    searchResults,
    handleInputChange,
    handleSearch,
    handleDropdownBlur,
    pathName,
  };
};

export default useSearch;
