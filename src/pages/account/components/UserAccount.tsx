import { List } from 'antd';
import EmptyWrap from '@/components/EmptyWrap';

interface UserAccountProps {
  data?: string;
}

const UserAccount = ({ data }: UserAccountProps) => {
  return (
    <>
      <List.Item>
        <List.Item.Meta
          title="账号"
          description={
            <>
              账号：
              <EmptyWrap value={data} />
            </>
          }
        />
      </List.Item>
    </>
  );
};

export default UserAccount;
