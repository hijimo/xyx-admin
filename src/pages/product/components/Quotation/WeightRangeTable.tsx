import React, { useCallback, useMemo } from 'react';
import type { ProFormInstance } from '@ant-design/pro-form';
import _unionBy from 'lodash/unionBy';
import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import { useQuery } from 'react-query';
import { Form, InputNumber, Select, Input, message } from 'antd';
import type { QuoteEditData } from '@/types';
import { UnitTypeDesc, UnitType } from '@/enum';
import { getDictionaryList } from '@/services/common';
import styles from './WeightRangeTable.less';

interface WeightRangeTableProps {
  formMapRef: React.MutableRefObject<React.MutableRefObject<ProFormInstance<any> | undefined>[]>;
  isActive?: boolean;
  readonly?: boolean;
  currencyText?: string;
  /**
   *  1 重量，2 件数
   */
  offerType?: UnitType;
}

const WeightRangeTable: React.FC<WeightRangeTableProps> = ({
  formMapRef,
  isActive,
  readonly,
  currencyText,
  offerType = UnitType.WEIGHT,
}) => {
  const { data } = useQuery(
    ['enum', { key: 'weightChargeUnitEnum' }],
    () => getDictionaryList({ keys: ['weightChargeUnitEnum'] }),
    { select: (d) => d.data },
  );

  const unitText = useMemo(() => {
    return UnitTypeDesc[offerType] || '';
  }, [offerType]);

  const labelText = useMemo(() => {
    switch (offerType) {
      case UnitType.WEIGHT:
        return '重';
      case UnitType.PIECES:
        return '件';
      default:
        return '重';
    }
  }, [offerType]);

  const options = useMemo(() => {
    return (
      data?.weightChargeUnitEnum?.map((item) => ({
        label: item.text,
        value: item.value,
      })) ?? []
    );
  }, [data]);

  const prevFormData = useMemo(() => {
    let f: QuoteEditData | undefined;
    if (isActive) {
      formMapRef.current?.forEach((formInstanceRef) => {
        f = { ...f, ...formInstanceRef.current?.getFieldsValue() };
      });
    } else {
      return undefined;
    }

    const { pricePriedList, partitionList, partitionInfoList } = f as QuoteEditData;

    const unitInitialValue = pricePriedList?.map((it, idx) => ({
      firstUnit:
        _get(
          partitionInfoList,
          `[0].partitionAreaList[${idx}].partitionFirstContinueInfo.firstUnit`,
        ) || 1,
      continueUnit:
        _get(
          partitionInfoList,
          `[0].partitionAreaList[${idx}].partitionFirstContinueInfo.continueUnit`,
        ) || 1,
    }));
    const valueInitialValue = pricePriedList?.map((it, idx) => ({
      firstVal:
        _get(
          partitionInfoList,
          `[0].partitionAreaList[${idx}].partitionFirstContinueInfo.firstVal`,
        ) || 1,
      continueVal:
        _get(
          partitionInfoList,
          `[0].partitionAreaList[${idx}].partitionFirstContinueInfo.continueVal`,
        ) || 1,
    }));

    // 如果是新建状态，把默认加进来
    const unionPartition = _unionBy(
      [
        {
          partitionName: '默认',
          id: undefined,
          rowKey: Date.now(),
          countryList: [],
          partitionCode: `${Date.now()}`,
        },
        ...(partitionList || []),
      ],
      'partitionName',
    );
    const partitionPriceListObj = {};
    unionPartition?.forEach((it, index) => {
      const partitionItem = partitionInfoList?.find(
        (p) =>
          p.partitionCode === it.partitionCode ||
          (p.partitionName === it.partitionName && it.partitionName === '默认'),
      );
      const initialValue = pricePriedList?.map((_, idx) => ({
        firstPrice: _get(
          partitionItem,
          `partitionAreaList[${idx}].partitionFirstContinueInfo.firstPrice`,
        ),
        continuePrice: _get(
          partitionItem,
          `partitionAreaList[${idx}].partitionFirstContinueInfo.continuePrice`,
        ),
        partitionName: it.partitionName,
        partitionCode: it.partitionCode,
        id: it?.id,
      }));
      partitionPriceListObj[`partitionPriceList${index}`] = initialValue;
    });

    setTimeout(() => {
      // 在render完成之后再设置值。
      formMapRef.current[3]!.current?.setFieldsValue({
        partitionUnitList: unitInitialValue,
        partitionValueList: valueInitialValue,
        ...partitionPriceListObj,
      });
    }, 0);

    return { ...f, unionPartition };
  }, [isActive, formMapRef]);

  const showErrorMessage = useCallback(
    _debounce((msg: string) => {
      message.error(msg);
    }, 800),
    [],
  );

  const renderTableHeaderForm = useCallback(() => {
    if (prevFormData === undefined) return null;
    const { pricePriedList, unionPartition } = prevFormData;

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>区间</th>
            {pricePriedList?.map((it, idx) => {
              if (it.priedStartVal === undefined || it.priedStartVal === null) {
                return (
                  <th colSpan={2} key={idx}>
                    {it.priedEndVal}
                    {unitText}以内
                  </th>
                );
              }
              return (
                <th colSpan={2} key={idx}>
                  {it.priedStartVal}-{it.priedEndVal}
                  {unitText}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* 如果是重量区间是3行， 件数区间是2行 */}
            <td rowSpan={offerType === UnitType.WEIGHT ? 3 : 2} />
            {pricePriedList?.map((it, idx) => (
              <React.Fragment key={`pricePriedList${idx}`}>
                {/* 如果是件数区间， 是首件、续件 */}
                <td>首{labelText}</td>
                <td>续{labelText}</td>
              </React.Fragment>
            ))}
          </tr>
          {/* 只有重量区间才显示 */}
          {offerType === UnitType.WEIGHT && (
            <tr>
              <Form.List name="partitionUnitList">
                {(fields) => (
                  <>
                    {fields.map((field) => (
                      <React.Fragment key={`partitionUnitList${field.key}`}>
                        <td>
                          首{labelText}单位
                          <Form.Item
                            {...field}
                            noStyle
                            validateFirst
                            name={[field.name, 'firstUnit']}
                            rules={[{ required: true, type: 'number', message: '请输入' }]}
                          >
                            <Select className={styles.mini} options={options} disabled={readonly} />
                          </Form.Item>
                        </td>
                        <td>
                          续{labelText}单位
                          <Form.Item
                            {...field}
                            noStyle
                            validateFirst
                            name={[field.name, 'continueUnit']}
                            rules={[{ required: true, type: 'number', message: '请输入' }]}
                          >
                            <Select className={styles.mini} options={options} disabled={readonly} />
                          </Form.Item>
                        </td>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </Form.List>
            </tr>
          )}

          <tr>
            <Form.List name="partitionValueList">
              {(fields) => (
                <>
                  {fields.map((field) => {
                    return (
                      <React.Fragment key={`partitionValueList${field.key}`}>
                        <td>
                          首{labelText}数值
                          <Form.Item
                            {...field}
                            noStyle
                            validateFirst
                            name={[field.name, 'firstVal']}
                            rules={[{ required: true, type: 'number', message: '请输入' }]}
                          >
                            <InputNumber
                              min={0.01}
                              placeholder="请输入"
                              className={styles.mini}
                              disabled={readonly}
                            />
                          </Form.Item>
                        </td>
                        <td>
                          续{labelText}数值
                          <Form.Item
                            {...field}
                            noStyle
                            validateFirst
                            name={[field.name, 'continueVal']}
                            rules={[{ required: true, type: 'number', message: '请输入' }]}
                          >
                            <InputNumber
                              min={0.01}
                              placeholder="请输入"
                              className={styles.mini}
                              disabled={readonly}
                            />
                          </Form.Item>
                        </td>
                      </React.Fragment>
                    );
                  })}
                </>
              )}
            </Form.List>
          </tr>
          {unionPartition?.map((it, index) => {
            return (
              <tr key={index}>
                <td>{it.partitionName}</td>
                <Form.List
                  name={`partitionPriceList${index}`}
                  rules={[
                    {
                      validator(rule, values) {
                        let f = false;
                        values.every((r: any) => {
                          f =
                            r.firstPrice === undefined ||
                            r.continuePrice === undefined ||
                            r.firstPrice === null ||
                            r.continuePrice === null;
                          return !f;
                        });
                        if (f) {
                          showErrorMessage('请输入完整的价格');
                          // message.error('请输入完整的价格');
                          return Promise.reject(new Error('请输入完整的价格'));
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  {(fields) => (
                    <>
                      {/* 不用errors，用message.error, 这里会破坏td */}
                      {/* {errors.length > 0 && <div className={styles.error}>{errors}</div>} */}

                      {fields.map((field) => (
                        <React.Fragment key={`partitionName${field.key}`}>
                          <td>
                            <Form.Item
                              hidden
                              key={`${field.key}partitionName`}
                              name={[field.name, 'partitionName']}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item hidden key={`${field.key}id`} name={[field.name, 'id']}>
                              <Input />
                            </Form.Item>
                            <Form.Item
                              noStyle
                              validateFirst
                              key={`${field.key}firstPrice`}
                              name={[field.name, 'firstPrice']}
                              rules={[{ required: true, type: 'number', message: '请输入' }]}
                            >
                              <InputNumber
                                addonAfter={currencyText}
                                placeholder="请输入"
                                disabled={readonly}
                                className={styles.w100}
                                min={0}
                              />
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              {...field}
                              noStyle
                              validateFirst
                              key={`${field.key}continuePrice`}
                              name={[field.name, 'continuePrice']}
                              rules={[{ required: true, type: 'number', message: '请输入' }]}
                            >
                              <InputNumber
                                disabled={readonly}
                                addonAfter={currencyText}
                                placeholder="请输入"
                                className={styles.w100}
                                min={0}
                              />
                            </Form.Item>
                          </td>
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </Form.List>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }, [
    prevFormData,
    options,
    currencyText,
    labelText,
    offerType,
    showErrorMessage,
    unitText,
    readonly,
  ]);

  return (
    <div>
      <Form.Item label="partitionInfoList" hidden name="partitionInfoList">
        <Input />
      </Form.Item>

      {renderTableHeaderForm()}
    </div>
  );
};

export default WeightRangeTable;
