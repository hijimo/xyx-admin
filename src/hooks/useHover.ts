import { useState, useMemo } from 'react';

const useHover = () => {
  const [hovered, set] = useState<boolean>(false);

  const bind = useMemo(
    () => ({
      onMouseEnter: () => set(true),
      onMouseLeave: () => set(false),
    }),
    [],
  );

  return {
    hovered,
    bind,
  };
};

export default useHover;
