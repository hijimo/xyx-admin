import { useState, useCallback } from 'react';

const useVisible = (initVisible = false) => {
  const [visible, setVisible] = useState(initVisible);
  const setToVisible = useCallback(() => setVisible(true), []);
  const setToInVisible = useCallback(() => setVisible(false), []);
  return {
    visible,
    setVisible,
    setToVisible,
    setToInVisible,
  };
};

export default useVisible;
