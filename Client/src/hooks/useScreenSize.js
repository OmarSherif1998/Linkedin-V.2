import { useState, useEffect } from 'react';

function useScreenSize() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowSize(width);
      setIsMobile(width < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, windowSize };
}

export default useScreenSize;
