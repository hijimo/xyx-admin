import React, { useRef, useState, useEffect, useMemo } from 'react';
import type { ProFormInstance, FormInstance } from '@ant-design/pro-form';
import _isNil from 'lodash/isNil';
import { StepsForm } from '@ant-design/pro-form';
import { useHistory } from 'umi';
import { Button, Modal } from 'antd';
import { useQuery, useMutation } from 'react-query';
import moment from 'moment';
import type { QuoteResponseData, QuoteEditData } from '@/types';
import { BooleanEnum } from '@/enum';
import { getChannelOfferDetail, addOrEditChannelOffer } from '@/services/quote';
import WeightRangeTable from './WeightRangeTable';
import PartitionScheme from './PartitionScheme';
import BaseInfoForm from './BaseInfoForm';
import type { PartitionTableData } from './PartitionTable';
import PriceRange from './PriceRange';
import { transportSubmitData, expandPartitionData } from './utils';
import styles from './styles.less';

interface QuotationProps {
  id: string;
  copyId?: string;
  readonly?: boolean;
  showPrice?: boolean;
  isAdded?: boolean;
}

const Quotation: React.FC<QuotationProps> = ({
  id,
  copyId,
  showPrice,
  readonly = false,
  isAdded = false,
}) => {
  const formMapRef = useRef<
    React.MutableRefObject<ProFormInstance<QuoteResponseData> | undefined>[]
  >([]);
  const currentFormRef = useRef<FormInstance<any> | undefined>();
  const [current, setCurrent] = useState<number>(0);
  const [dataSource, setDataSource] = useState<PartitionTableData[]>([]);

  const history = useHistory();

  const { data } = useQuery(['channelOfferDetail', id], () => getChannelOfferDetail(id), {
    select: (d) => d.data,
  });

  useEffect(() => {
    if (data !== undefined && formMapRef !== undefined) {
      // 添加的时候设置初值默认值
      const { offerType, productId, productType } = data;

      formMapRef.current[1]!.current?.setFieldsValue({
        offerType,
        defaultPriceFlag: BooleanEnum.FALSE,
        productId,
        // 如果是复制模式下，offerId应该是费用项初始的id,而不是被复制项的id。
        offerId: parseInt(copyId || id, 10),
        productType,
      });
      // 如果是编辑
      if (isAdded !== true || !_isNil(copyId)) {
        // 第一个表单
        const { gmtValid, gmtUnvalid, priceLevel } = data;
        formMapRef.current[0]!.current?.setFieldsValue({
          gmtValid: _isNil(gmtValid) || copyId ? undefined : moment(gmtValid),
          // gmtUnvalid 组件是Input ,不是DatePicker
          gmtUnvalid: _isNil(gmtUnvalid) || copyId ? undefined : gmtUnvalid,
          priceLevel,
        });
        // 第二个表单
        const { defaultPriceFlag, projectName, partitionList } = data;
        formMapRef.current[1]!.current?.setFieldsValue({
          projectName,
          defaultPriceFlag: defaultPriceFlag || BooleanEnum.FALSE,
          partitionList,
        });
        setDataSource(partitionList?.map((it) => expandPartitionData(it)).flat());

        // 第三个表单
        const { pricePriedList } = data;
        if (pricePriedList !== undefined && pricePriedList !== null) {
          formMapRef.current[2]!.current?.setFieldsValue({
            pricePriedList: pricePriedList?.map((it) => ({
              priedEndVal: parseInt(`${it.priedEndVal}`, 10),
              priedStartVal:
                it.priedStartVal !== null ? parseInt(`${it.priedStartVal}`, 10) : undefined,
              priedUnit: parseInt(`${it.priedUnit}`, 10) || offerType,
            })),
          });
        }

        // 第四个表单
        const { partitionInfoList } = data;
        formMapRef.current[3]!.current?.setFieldsValue({
          partitionInfoList,
        });
      }
    }
  }, [data, formMapRef, id, copyId, isAdded]);

  const { mutate, isLoading } = useMutation(
    (values: QuoteResponseData) =>
      addOrEditChannelOffer({ ...values, isAdded: isAdded ? BooleanEnum.TRUE : BooleanEnum.FALSE }),
    {
      onSuccess: () => {
        Modal.info({
          title: '提示',
          content: '添加成功！',
          onOk: () => {
            history.goBack();
          },
        });
      },
    },
  );

  const priceLevelList = useMemo(() => {
    return data?.priceLevelList;
  }, [data]);
  const submitter = useMemo(() => {
    return {
      render: (props: any) => {
        if (props.step === 0) {
          return (
            <Button type="primary" onClick={() => props.onSubmit?.()}>
              下一步
            </Button>
          );
        } else if (props.step < 3) {
          return [
            <Button key="pre" onClick={() => props.onPre?.()}>
              上一步
            </Button>,
            <Button type="primary" key="goToTree" onClick={() => props.onSubmit?.()}>
              下一步
            </Button>,
          ];
        } else if (readonly) {
          return [
            <Button key="gotoTwo" onClick={() => props.onPre?.()}>
              上一步
            </Button>,
            <Button type="primary" key="goToTree" onClick={() => history.goBack()}>
              返回
            </Button>,
          ];
        } else {
          return [
            <Button key="gotoTwo" onClick={() => props.onPre?.()}>
              上一步
            </Button>,
            <Button
              type="primary"
              key="goToTree"
              loading={isLoading}
              onClick={() => props.onSubmit?.()}
            >
              提交
            </Button>,
          ];
        }
      },
    };
  }, [readonly, history, isLoading]);

  return (
    <div className={styles.index}>
      <StepsForm
        formMapRef={formMapRef}
        formRef={currentFormRef}
        onCurrentChange={setCurrent}
        current={current}
        submitter={submitter}
        onFinish={async (values: QuoteEditData) => {
          if (readonly) return Promise.resolve(true);
          return await mutate(transportSubmitData(values));
        }}
      >
        <StepsForm.StepForm name="step1" title="基本信息" layout="horizontal" colon={false}>
          <BaseInfoForm
            productId={data?.productId}
            // 如果是复制模式下，offerId应该是费用项初始的id,而不是被复制项的id。
            offerId={parseInt(copyId || id, 10)}
            productType={data?.productType}
            isAdded={isAdded}
            showPrice={showPrice}
            readonly={readonly}
            priceLevelList={priceLevelList}
          />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="step2" title="分区方案设置" layout="horizontal" colon={false}>
          <PartitionScheme formRef={currentFormRef} tableData={dataSource} readonly={readonly} />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="step3" title="价格区间设置" layout="horizontal" colon={false}>
          <PriceRange formRef={currentFormRef} offerType={data?.offerType} readonly={readonly} />
        </StepsForm.StepForm>
        <StepsForm.StepForm name="step4" title="报价设置" style={{ overflow: 'auto' }}>
          <WeightRangeTable
            offerType={data?.offerType}
            currencyText={data?.settleCurrencyText}
            formMapRef={formMapRef}
            readonly={readonly}
            isActive={current === 3}
          />
        </StepsForm.StepForm>
      </StepsForm>
    </div>
  );
};

export default Quotation;
