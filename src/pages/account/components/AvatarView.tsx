import { useRef } from 'react';
import { useMutation } from 'react-query';
import { Avatar, message, Button, Upload, List, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { File } from '@/types';
import Uploader from '@/components/Upload/utils/Uploader';
import { checkIsSizeOut } from '@/components/Upload/utils/utils';
import type { XMLHttpRequestExtend } from '@/components/Upload/utils/Uploader';
import defaultAvata from '@/assets/icon-default-avatar@2x.png';
import { updateUserInfo } from '@/services/user';

interface AvatarViewProps {
  data?: string;
  onSuccess: () => void;
}

const AvatarView = ({ data, onSuccess }: AvatarViewProps) => {
  const { mutate } = useMutation((params: string) => updateUserInfo({ userPhoto: params }), {
    onSuccess: () => {
      message.success('更新成功');
      onSuccess?.();
    },
  });

  const uploadreRef = useRef<Uploader>(
    new Uploader({
      name: 'file',
      onSuccess(res: XMLHttpRequestExtend) {
        mutate(res.fileUrl!);
      },
      onError() {
        message.error('头像上传失败!');
      },
    }),
  );

  return (
    <List.Item>
      <List.Item.Meta
        title="头像"
        description={
          <Space direction="vertical">
            <Avatar size={120} src={data ? data : defaultAvata} />
            <Upload
              accept="image/png,image/jpeg,image/gif"
              multiple={false}
              showUploadList={false}
              maxCount={1}
              beforeUpload={(file) => {
                if (checkIsSizeOut(file as unknown as File, 10240)) {
                  message.error(`文件大小不能超过10240KB`);
                } else {
                  uploadreRef.current.upload(file);
                }

                return false;
              }}
            >
              <Button type="default" icon={<UploadOutlined />}>
                更换头像
              </Button>
            </Upload>
          </Space>
        }
      />
    </List.Item>
  );
};

export default AvatarView;
