import { useState, useCallback } from 'react';

const useReload = () => {
  const [reloadToken, setReloadToken] = useState({});

  const reload = useCallback(() => setReloadToken({}), []);

  return {
    reloadToken,
    reload,
  };
};

export default useReload;
