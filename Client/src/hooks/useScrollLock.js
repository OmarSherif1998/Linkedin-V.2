import { useEffect } from 'react';

const useScrollLock = (shouldLock) => {
  useEffect(() => {
    if (shouldLock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [shouldLock]);
};

export default useScrollLock;
