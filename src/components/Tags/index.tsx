import React, { useState, useEffect } from 'react';
import { Tag } from 'antd';
import styles from './index.less';

export interface TagsProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  onTagClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>, value: string, index: number) => void;
}

const Tags: React.FC<TagsProps> = ({ value, onChange, onTagClose }) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return internalValue ? (
    <div className={styles.tags}>
      {internalValue.map((data, index) => (
        <Tag
          key={index}
          className={styles.tag}
          closable
          onClose={(e) => {
            if (onTagClose) {
              onTagClose(e, data, index);
            } else {
              e.preventDefault();
              const newValue = [
                ...internalValue.slice(0, index),
                ...internalValue.slice(index + 1, internalValue.length),
              ];
              setInternalValue(newValue);
              onChange?.(newValue);
            }
          }}
        >
          {data}
        </Tag>
      ))}
    </div>
  ) : null;
};

export default Tags;
