import React, { useRef, useState, useMemo, useCallback, useImperativeHandle } from 'react';
import { produce } from 'immer';
import { Form, Button, Input } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { PartitionEditData, PartitionEditTableData } from '@/types';
import { ProjectType } from '@/enum';
import MultiLineInput from '@/components/MultiLineInput';
import ProjectSelect from '@/pages/components/ProjectSelect';
import GlobalCitySelect from '@/pages/components/GlobalCitySelect';
import styles from './PartitionForm.less';

interface PartitionFormProps extends FormProps {
  showPartition?: boolean;
}
export interface RefPartitionFormProps {
  submit: () => void;
}

const updateCountryListValue = (
  form: FormInstance<PartitionEditData> | null,
  newValue: PartitionEditTableData,
  index: number,
) => {
  form?.setFieldsValue({
    countryList: produce(
      form?.getFieldValue('countryList') as PartitionEditTableData[],
      (draft) => {
        draft[index!] = { ...draft[index!], ...newValue };
      },
    ),
  });
};

const PartitionForm = (
  { initialValues, showPartition = true, ...otherProps }: PartitionFormProps,
  ref: React.Ref<RefPartitionFormProps>,
) => {
  const partitionFormRef = useRef<FormInstance<PartitionEditData>>(null);
  const [tableForm] = Form.useForm();

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(
    ((initialValues as PartitionEditData)?.countryList || []).map((it) => it.rowKey as number),
  );

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        await tableForm.validateFields();
        partitionFormRef.current?.submit();
      } catch {
        // 验证出错，无动作
      }
    },
  }));

  const actionRef = useRef<ActionType>();

  const handleAdd = useCallback(() => {
    actionRef.current?.addEditRecord(
      { rowKey: Date.now() },
      {
        newRecordType: 'dataSource',
      },
    );
  }, []);

  const columns = useMemo(
    () =>
      [
        {
          title: '国家名称',
          dataIndex: 'countryId',
          key: 'countryId',
          className: 'nowrap',
          formItemProps: () => ({
            rules: [
              {
                required: true,
                type: 'object',
                message: '国家名称必填',
              },
            ],
          }),
          renderFormItem: ({ index }, { recordKey, record }, form) => {
            return (
              <GlobalCitySelect
                labelInValue
                transferFlag={1}
                onChange={(value, option: any) => {
                  form.setFieldsValue({
                    [`${recordKey}`]: {
                      projectVal: undefined,
                      countryCode: option?.extra.code,
                    },
                  });

                  updateCountryListValue(
                    partitionFormRef.current,
                    form.getFieldValue(`${recordKey}`),
                    index!,
                  );

                  if (
                    record?.projectType !== undefined &&
                    ProjectType.COUNTRY !== record?.projectType.value
                  ) {
                    const keys = ['projectVal'].map((k) => [`${recordKey}`, k]);
                    form.validateFields(keys);
                  }
                }}
              />
            );
          },
        },
        {
          title: '国家代码',
          dataIndex: 'countryCode',
          width: 80,
          key: 'countryCode',
          className: 'nowrap',
          editable: false,
        },
        {
          title: '方案类型',
          dataIndex: 'projectType',
          key: 'projectType',
          className: 'nowrap',
          formItemProps: () => ({
            rules: [
              {
                required: true,
                type: 'object',
                message: '方案类型必填',
              },
            ],
          }),
          renderFormItem: ({ index }, { recordKey }, form) => (
            <ProjectSelect
              labelInValue
              onChange={(value) => {
                form.setFieldsValue({
                  [`${recordKey}`]: {
                    projectVal: undefined,
                  },
                });

                updateCountryListValue(
                  partitionFormRef.current,
                  form.getFieldValue(`${recordKey}`),
                  index!,
                );

                if (ProjectType.COUNTRY !== value) {
                  const keys = ['projectVal'].map((k) => [`${recordKey}`, k]);
                  form.validateFields(keys);
                }
              }}
            />
          ),
        },
        {
          title: '城市/邮编',
          dataIndex: 'projectVal',
          key: 'projectVal',
          className: 'nowrap',
          dependencies: ['countryId'],
          formItemProps: (f, config) => {
            // 国家方式不验证
            if (
              [ProjectType.COUNTRY, `${ProjectType.COUNTRY}`, undefined].includes(
                config.entity?.projectType?.value,
              )
            ) {
              return {};
            }
            // 城市数据格式是数组
            if (
              [ProjectType.CITY, `${ProjectType.CITY}`].includes(config.entity?.projectType?.value)
            ) {
              return {
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '城市/邮编必须',
                  },
                ],
              };
            }
            // 邮编数据格式是字符串
            return {
              rules: [
                {
                  required: true,
                  type: 'string',
                  message: '城市/邮编必须',
                },
              ],
            };
          },
          renderFormItem: ({ index }, { recordKey, record }, form) => {
            // if 城市方案
            const handleChange = () => {
              updateCountryListValue(
                partitionFormRef.current,
                form.getFieldValue(`${recordKey}`),
                index!,
              );
            };

            if (ProjectType.CITY === record?.projectType?.value)
              return (
                <GlobalCitySelect
                  level={3}
                  pid={record.countryId?.value}
                  mode="multiple"
                  maxTagCount="responsive"
                  labelInValue
                  placeholder="请输入或选择"
                  onChange={handleChange}
                />
              );
            if (ProjectType.POSTALCODE === record?.projectType?.value)
              // if 邮编方案
              return <MultiLineInput maxLine={9999} onChange={handleChange} />;
            return <Input hidden />;
          },
        },
        {
          title: '操作',
          dataIndex: 'option',
          valueType: 'option',
          key: 'option',
          className: 'nowrap',
        },
      ] as ProColumns<PartitionEditTableData>[],
    [partitionFormRef],
  );

  return (
    <Form {...otherProps} ref={partitionFormRef} initialValues={initialValues}>
      {showPartition && (
        <>
          <Form.Item hidden name="id">
            <Input />
          </Form.Item>
          <Form.Item hidden name="partitionCode">
            <Input />
          </Form.Item>
          <Form.Item
            label="分区名称"
            rules={[
              { required: true, message: '请输入分区名称' },
              {
                validator(rule, value) {
                  if (value?.trim() === '默认') {
                    return Promise.reject(new Error('分区名称不能为“默认”'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
            name="partitionName"
          >
            <Input placeholder="请输入分区名称" />
          </Form.Item>
        </>
      )}
      <div className={styles.desc}>
        <Button onClick={handleAdd} type="primary" className={styles.button}>
          添加国家
        </Button>
        注：邮编方案，当输入多个邮编时，每个邮编输入完成请用ENTER键确定
      </div>

      {/* 用来显示error信息 */}
      <Form.Item noStyle name="countryList">
        <EditableProTable
          className={styles.table}
          rowKey="rowKey"
          recordCreatorProps={false}
          columns={columns}
          actionRef={actionRef}
          editable={{
            form: tableForm,
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },
            onChange: setEditableRowKeys,
          }}
        />
      </Form.Item>
    </Form>
  );
};

const PartitionFormRef = React.forwardRef(PartitionForm) as (
  props: PartitionFormProps & { ref?: React.Ref<RefPartitionFormProps> },
) => React.ReactElement;

export default PartitionFormRef;
