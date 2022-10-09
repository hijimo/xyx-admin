import { useEffect, useRef } from 'react';

const useDelay = (millisecond: number) => {
  const timer = useRef<any>(null);

  const setDelay = (func: any) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      func();
    }, millisecond);
  };

  const clearDelay = () => {
    clearTimeout(timer.current);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return { setDelay, clearDelay };
};

export default useDelay;
