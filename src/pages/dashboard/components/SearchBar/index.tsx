import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { Input } from 'antd';
import Icon from '@/components/Icon';
import styles from './index.less';

interface SearchBarProps {
  className?: string;
  flex?: boolean;
  onSearch?: (keyword?: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ className, onSearch }) => {
  const [input, setInput] = useState('');
  const handlePressEnter: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    onSearch?.(e.currentTarget.value);
  }, []);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  // 防止没键盘，用鼠标操作。
  const handleIconClick: React.MouseEventHandler<HTMLSpanElement> = useCallback(() => {
    onSearch?.(input);
  }, [input]);

  return (
    <div className={classNames(styles.search, className)}>
      <Input
        placeholder="搜索"
        value={input}
        className={styles.input}
        onChange={handleChange}
        onPressEnter={handlePressEnter}
      />
      <Icon type="search" className={styles.icon} onClick={handleIconClick} />
    </div>
  );
};

export default React.memo(SearchBar);
