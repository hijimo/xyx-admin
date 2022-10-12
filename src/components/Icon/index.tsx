import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont';

export const iconfontUrl = '//at.alicdn.com/t/font_3368206_0g6ilpkp4k9.js'; // 在 iconfont.cn 上生成

const CustomIcon = createFromIconfontCN({
  scriptUrl: iconfontUrl, // 在 iconfont.cn 上生成
});

const Icon: React.FC<IconFontProps> = ({ type, ...others }) => {
  const prefixClass = 'icon-';
  return <CustomIcon type={`${prefixClass}${type}`} {...others} />;
};

export default Icon;
