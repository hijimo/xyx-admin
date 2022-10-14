import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

import React from 'react';

interface RemoveProps {
  onClick?: () => void;
}
const Remove: React.FC<RemoveProps> = ({ children, ...props }) => (
  <DeleteOutlined
    size={16}
    style={{ marginLeft: 35, color: '#1890FF', cursor: 'pointer' }}
    {...props}
  />
);

export default Remove;
