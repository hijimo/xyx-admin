import _isEmpty from 'lodash/isEmpty';
import useLocalStorage from './useLocalStorage';

const DEFAULT_DATA = '[]';

const useSearchHistory = (key: string, maxCount: number) => {
  const [value, setValue] = useLocalStorage(key, DEFAULT_DATA);

  let parsedValue: string[] = [];
  try {
    parsedValue = JSON.parse(value).slice(0, maxCount);
  } catch (error) {
    parsedValue = [];
  }

  const addItem = (item: string) => {
    // 当输入的值为空的时候，不计入历史记录
    if (_isEmpty(item)) return;

    const index = parsedValue.findIndex((d) => d === item);

    const newValue =
      index === -1
        ? [item, ...parsedValue.slice(0, maxCount - 1)]
        : [item, ...parsedValue.slice(0, index), ...parsedValue.slice(index + 1, maxCount)];

    setValue(JSON.stringify(newValue));
  };

  return [parsedValue, addItem];
};

export default useSearchHistory;
