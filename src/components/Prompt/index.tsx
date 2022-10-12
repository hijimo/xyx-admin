import React, { useState } from 'react';
import { Modal } from 'antd-mobile';
import { Prompt, history } from 'umi';

interface UPromptProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  message?: string;
  okBtnText?: string;
  cancelBtnText?: string;
  buttonReverse?: boolean;
  activeState: 'POP' | 'PUSH' | 'REPLACE' | 'ALL';
  onCancel?: () => void;
  onOk?: () => void;
}

const UPrompt: React.FC<UPromptProps> = ({
  onCancel,
  onOk,
  title = '提示',
  message = '',
  activeState,
  okBtnText = '确定',
  cancelBtnText = '关闭',
  buttonReverse = false,
}) => {
  const [userLeave, setUserLeave] = useState<boolean>(false);

  const buttonCancel = { text: cancelBtnText, onPress: onCancel };
  const buttonOk = {
    text: okBtnText,
    onPress: () => {
      setUserLeave(true);
      onOk?.();
      history.goBack();
    },
  };

  const actions = buttonReverse ? [buttonOk, buttonCancel] : [buttonCancel, buttonOk];

  return (
    <Prompt
      message={(l, action) => {
        if (activeState.includes(action) || activeState === 'ALL') {
          if (userLeave === false) {
            Modal.alert(title, message, actions);
          }
          return userLeave;
        }
        return true;
      }}
    />
  );
};

export default UPrompt;
