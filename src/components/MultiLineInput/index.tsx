import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import _compact from 'lodash/compact';
import { Input, Modal } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';
import { MenuOutlined } from '@ant-design/icons';

interface MultiLineInputProps {
  maxLine?: number;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: () => void;
}

interface InternalTextareaProps extends TextAreaProps {
  maxLine?: number;
  externalValue?: string;
  onValueChange?: (value: string) => void;
}

const regexp = /[^A-Za-z0-9_-]+/;

const textareaAutoSize = { minRows: 5, maxRows: 20 };

const getMaxLineValue = (originValue?: string, maxLine?: number) => {
  const splitedValue = originValue?.split(regexp);
  const compactedValue = _compact(splitedValue);
  const filteredValue = compactedValue.slice(0, maxLine);
  const value = splitedValue?.slice(-1)[0] === '' ? filteredValue.concat('') : filteredValue;
  return value;
};

const InternalTextarea = ({
  externalValue,
  maxLine,
  onValueChange,
  onChange,
  ...otherProps
}: InternalTextareaProps) => {
  const [value, setValue] = useState<string | undefined>(externalValue);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const filteredValue = getMaxLineValue(e.target.value, maxLine);
      setValue(filteredValue.join('\n'));
      onValueChange?.(filteredValue.join(' '));
      onChange?.(e);
    },
    [maxLine, onChange, onValueChange],
  );

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    setValue(externalValue);
  }, [externalValue]);

  return (
    <Input.TextArea
      autoFocus
      allowClear
      autoSize={textareaAutoSize}
      onKeyPress={handleKeyPress}
      value={value}
      onChange={handleChange}
      {...otherProps}
    />
  );
};

const MultiLineInput = ({ maxLine = 50, value, onChange, onSearch }: MultiLineInputProps) => {
  const [visible, setVisible] = useState(false);
  const textareaValueRef = useRef<string>();

  const placeholder = `请输入或粘贴 最大支持${maxLine}个`;

  const paseredValue = getMaxLineValue(value, maxLine);
  const inputValue = paseredValue?.join(' ');
  const textareaValue = paseredValue?.join('\n');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const filteredValue = getMaxLineValue(e.target.value, maxLine);
      onChange?.(filteredValue.join(' '));
    },
    [maxLine, onChange],
  );

  const addonAfter = useMemo(() => {
    return <MenuOutlined onClick={() => setVisible(true)} />;
  }, []);

  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const handleValueChange = useCallback(
    (data: string) => {
      textareaValueRef.current = data;
    },
    [textareaValueRef],
  );

  const handleOk = useCallback(() => {
    setVisible(false);
    onChange?.(textareaValueRef.current!);
    onSearch?.();
  }, [onChange, onSearch]);

  return (
    <>
      <Input
        placeholder={placeholder}
        allowClear
        value={inputValue}
        onChange={handleChange}
        addonAfter={addonAfter}
      />
      <Modal
        title="多行输入"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
        destroyOnClose
      >
        <InternalTextarea
          placeholder={placeholder}
          maxLine={maxLine}
          externalValue={textareaValue}
          onValueChange={handleValueChange}
        />
      </Modal>
    </>
  );
};

export default React.memo(MultiLineInput);
