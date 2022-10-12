import _isArray from 'lodash/isArray';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';

export const roleInfoItem: ProColumns<any> = {
  title: '角色',
  dataIndex: 'roleInfoItem',
  className: 'nowrap',
  hideInForm: true,
  search: false,
  render(_, record) {
    if (_isArray(record.roleInfoItem)) {
      if (record.roleInfoItem.length > 1) {
        const overlay = (
          <Menu>
            {record.roleInfoItem?.map((role: any) => (
              <Menu.Item key={role.roleNo}>{role.roleName}</Menu.Item>
            ))}
          </Menu>
        );
        return (
          <Dropdown overlay={overlay}>
            <span>
              {record.roleInfoItem[0].roleName} <DownOutlined />
            </span>
          </Dropdown>
        );
      }
      return record.roleInfoItem[0].roleName;
    }
    return undefined;
  },
};
