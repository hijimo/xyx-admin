import { Typography } from 'antd';

import React from 'react';

const FormListTitle: React.FC = ({ children, ...props }) => (
  <Typography.Text strong style={{ marginBottom: 12, display: 'block' }} {...props}>
    {children}
  </Typography.Text>
);

export default FormListTitle;
