import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const isBrowser = typeof window !== 'undefined';
  const [width, setWidth] = useState(isBrowser ? window.innerWidth : 0);

  useEffect(() => {
    if (!isBrowser) return;

    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return width;
};

export default useWindowWidth;
