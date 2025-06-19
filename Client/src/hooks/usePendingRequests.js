import { useQuery } from '@tanstack/react-query';
import { getConnectionRequests } from '../api/connectionAPI';

export default function usePendingRequests(_id) {
  return useQuery({
    queryKey: ['pendingRequests', _id],
    queryFn: () => getConnectionRequests(_id),
    enabled: !!_id,
  });
}
