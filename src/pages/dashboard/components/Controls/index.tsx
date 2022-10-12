import React, { useCallback, useState, useRef } from 'react';
import { Radio, Space, Button, Input, Select, message } from 'antd';
import _isNil from 'lodash/isNil';
import { InstructionTypeEnum } from '@/enum';
import { sendDeviceInstruction } from '@/services/dashboard';
import styles from './index.less';

interface ControlsProps {
  className?: string;
  id: number;
  deviceCode: string;
  data?: any[];
  onSuccess?: () => void;
}

const Controls: React.FC<ControlsProps> = ({ data, id, deviceCode, onSuccess }) => {
  const [currentControlsValue, setCurrentControlsValue] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const [metaValue, setMetaValue] = useState<any>();
  const metaValueRef = useRef<any>();

  // const { isLoading, mutate } = useMutation(
  //   (d: SendDeviceInstructionParams) => sendDeviceInstruction(d),
  //   {
  //     onSuccess: () => {
  //       message.success('发送成功');
  //     },
  //   },
  // );

  const handleSend = useCallback(
    (e) => {
      if (_isNil(currentControlsValue)) {
        message.info('请选择指令');
        return;
      }
      if (_isNil(metaValueRef.current)) {
        message.info('请输入指令值');
        return;
      }
      setIsLoading(true);
      sendDeviceInstruction({
        deviceCode: deviceCode,
        id: id,
        metaKey: currentControlsValue,
        metaValue: metaValueRef.current,
      })
        .then((res) => {
          message.success('发送成功');
          onSuccess?.();
        })
        .finally(() => {
          setIsLoading(false);
        });

      e.preventDefault();
      e.stopPropagation();
      return false;
    },
    [currentControlsValue],
  );

  const handlePreventDefault = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const getDefaultValue = (list, text) => {
    const a = list.find((it) => it.name === text);
    return a?.value;
  };

  return (
    <div className={styles.controls}>
      <Radio.Group
        onChange={(e) => setCurrentControlsValue(e.target.value)}
        value={currentControlsValue}
        className={styles.space}
        onClick={handlePreventDefault}
        onTouchStart={handlePreventDefault}
      >
        <Space direction="vertical">
          {data.map((it, idx) => (
            <Radio
              value={it.metaKey}
              key={idx}
              onClick={handlePreventDefault}
              onTouchStart={handlePreventDefault}
            >
              {it.metaName}
              {currentControlsValue === it.metaKey && it.dataType === InstructionTypeEnum.BOOL && (
                // <EnumSelect enumDesc={BooleanDesc} />
                <Select
                  placeholder="请选择"
                  onChange={(v) => {
                    // setMetaValue(v);
                    metaValueRef.current = v;
                  }}
                  defaultValue={getDefaultValue(it.orderDtos, it.metaValue)}
                  onClick={handlePreventDefault}
                  onTouchStart={handlePreventDefault}
                  className={styles.select}
                >
                  {it.orderDtos?.map((iit) => (
                    <Select.Option
                      value={iit.value}
                      key={iit.value}
                      onClick={handlePreventDefault}
                      onTouchStart={handlePreventDefault}
                    >
                      {iit.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
              {currentControlsValue === it.metaKey &&
                [
                  InstructionTypeEnum.INT,
                  InstructionTypeEnum.FLOAT,
                  InstructionTypeEnum.STRING,
                  InstructionTypeEnum.STR,
                ].includes(it.dataType) && (
                  <Input
                    // onClick={handlePreventDefault}
                    // onTouchStart={handlePreventDefault}
                    onChange={(e) => {
                      // setMetaValue(e.target.value);
                      metaValueRef.current = e.target.value;
                    }}
                    defaultValue={it.metaValue}
                    placeholder="请输入"
                    addonAfter={it.metaUnit}
                    className={styles.input}
                  />
                )}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      <div className={styles.buttonBar}>
        <Button className={styles.button} type="primary" loading={isLoading} onClick={handleSend}>
          下发指令
        </Button>
      </div>
    </div>
  );
};

export default Controls;
