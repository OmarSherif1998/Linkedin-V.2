import { useState } from 'react';
import useUser from './useUser';
import { followCompany, unfollowCompany } from '../api/companyAPI';
import { useQueryClient } from '@tanstack/react-query';

const useFollowCompany = (initialIsFollowing, companyId) => {
  const { _id: userId } = useUser();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  const handleFollow = async () => {
    console.log('handleFollow');
    try {
      setIsDisabled(true);

      const action = isFollowing ? unfollowCompany : followCompany;
      const response = await action(userId, companyId);

      if (response.status === 200) {
        setIsFollowing(!isFollowing);
        queryClient.invalidateQueries(['companyData', companyId]);
      }
    } catch (error) {
      console.error('Follow action failed:', error);
    } finally {
      setIsDisabled(false);
    }
  };

  return { isFollowing, isDisabled, handleFollow };
};

export default useFollowCompany;
