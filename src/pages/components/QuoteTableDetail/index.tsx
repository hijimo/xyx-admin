import React, { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Empty, Skeleton } from 'antd';
import type { ResponseData } from '@/utils/request';
import type { QuoteResponseData } from '@/types';
import { getChannelOfferDetail } from '@/services/quote';
import { UnitTypeDesc, UnitType } from '@/enum';
import styles from './index.less';

interface QuoteTableDetailProps {
  id: number;
  getOfferDetail?: (id: number | string) => Promise<ResponseData<QuoteResponseData>>;
  showQuoteNo?: boolean;
}

const QuoteTableDetail: React.FC<QuoteTableDetailProps> = ({
  id,
  getOfferDetail = getChannelOfferDetail,
  showQuoteNo,
}) => {
  const { data, isLoading } = useQuery(['quoteTableDetail', id], () => getOfferDetail(id), {
    enabled: !!id,
    select: (d) => d.data,
  });

  const unitText = useMemo(() => {
    return UnitTypeDesc[data?.offerType || UnitType.WEIGHT] || '';
  }, [data]);

  const labelText = useMemo(() => {
    switch (data?.offerType) {
      case UnitType.WEIGHT:
        return '重';
      case UnitType.PIECES:
        return '件';
      default:
        return '重';
    }
  }, [data]);

  const renderTableHeaderForm = useCallback(() => {
    if (data === undefined) return null;

    const { partitionInfoList, pricePriedList, offerType, settleCurrencyText } = data;

    return (
      <Skeleton loading={isLoading}>
        {partitionInfoList ? (
          <div style={{ width: '100%', overflow: 'auto' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>区间</th>
                  {pricePriedList?.length > 0 &&
                    pricePriedList?.map((it, idx) => {
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
                  {pricePriedList?.length > 0 &&
                    pricePriedList?.map((it, idx) => (
                      <React.Fragment key={idx}>
                        {/* 如果是件数区间， 是首件、续件 */}
                        <td>首{labelText}</td>
                        <td>续{labelText}</td>
                      </React.Fragment>
                    ))}
                </tr>
                {/* 只有重量区间才显示 */}
                {offerType === UnitType.WEIGHT && (
                  <tr>
                    {pricePriedList?.length > 0 &&
                      pricePriedList?.map((it, idx) => (
                        <React.Fragment key={idx}>
                          {/* 如果是件数区间， 是首件、续件 */}
                          <td>
                            首{labelText}单位
                            {
                              partitionInfoList[0]!.partitionAreaList[idx]!
                                .partitionFirstContinueInfo?.firstUnitText
                            }
                          </td>
                          <td>
                            续{labelText}单位
                            {
                              partitionInfoList[0]!.partitionAreaList[idx]!
                                .partitionFirstContinueInfo?.continueUnitText
                            }
                          </td>
                        </React.Fragment>
                      ))}
                  </tr>
                )}
                <tr>
                  {partitionInfoList?.length > 0 &&
                    partitionInfoList[0]!.partitionAreaList?.length > 0 &&
                    partitionInfoList[0]!.partitionAreaList?.map((it, idx) => (
                      <React.Fragment key={idx}>
                        <td>
                          首{labelText}数值 {it.partitionFirstContinueInfo?.firstVal}
                        </td>
                        <td>
                          续{labelText}数值 {it.partitionFirstContinueInfo?.continueVal}
                        </td>
                      </React.Fragment>
                    ))}
                </tr>
                {partitionInfoList?.length > 0 &&
                  partitionInfoList.map((partition, idx) => (
                    <tr key={idx}>
                      <td>{partition.partitionName}</td>
                      {pricePriedList?.length > 0 &&
                        pricePriedList?.map((it, index) => (
                          <React.Fragment key={index}>
                            {/* 如果是件数区间， 是首件、续件 */}
                            <td>
                              {
                                partition.partitionAreaList[index]?.partitionFirstContinueInfo
                                  ?.firstPrice
                              }
                              {settleCurrencyText}
                            </td>
                            <td>
                              {
                                partition.partitionAreaList[index]?.partitionFirstContinueInfo
                                  ?.continuePrice
                              }
                              {settleCurrencyText}
                            </td>
                          </React.Fragment>
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Skeleton>
    );
  }, [data, isLoading, labelText, unitText, showQuoteNo]);

  return <div>{renderTableHeaderForm() || <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}</div>;
};

export default QuoteTableDetail;
