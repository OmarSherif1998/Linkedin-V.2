import { useState } from 'react';
import {
  sendConnectionRequest,
  cancelConnectionRequest,
} from '../api/connectionAPI';

export default function useConnectionToggle(
  userID,
  targetUserID,
  initialState = false,
) {
  const [isPending, setIsPending] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const toggleConnection = async () => {
    setIsLoading(true);
    try {
      if (!isPending) {
        await sendConnectionRequest(userID, targetUserID);
        setIsPending(true);
      } else {
        await cancelConnectionRequest(userID, targetUserID);
        setIsPending(false);
      }
    } catch (error) {
      console.error('Connection toggle failed:', error);
      // optionally handle error or rollback state
    } finally {
      setIsLoading(false);
    }
  };

  return { isPending, isLoading, toggleConnection };
}
