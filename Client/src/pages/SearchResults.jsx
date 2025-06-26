import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Search } from '../api/searchAPI';

function SearchResults() {
  const { searchParam } = useParams();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['searchResults', searchParam],
    queryFn: () => Search(searchParam),
  });
  return <div>SearchResults</div>;
}

export default SearchResults;
