import _unionBy from 'lodash/unionBy';
import _isObject from 'lodash/isObject';
import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _first from 'lodash/first';
import { ProjectType } from '@/enum';
import type {
  PartitionEditTableData,
  PartitionCountryData,
  OptionItemSSD,
  PartitionData,
  QuoteResponseData,
  QuoteEditData,
} from '@/types';

/**
 * 将分区数据转换成 表格显示的数据。
 * @param values
 * @returns
 */
export const expandPartitionData = (values: PartitionData) => {
  return values.countryList.map((country, index) => ({
    ...values,
    ...country,
    rowKey: values.rowKey || country.rowKey || Math.random() * 1000000000,
    rowSpan: index === 0,
  }));
};

/**
 * 将接口拿到的数据转换成编辑的数据格式
 * @param values QuoteResponseData
 * @return QuoteEditData
 */
export const transportEditData = (values: QuoteResponseData): QuoteEditData => {
  const { partitionInfoList, partitionList, pricePriedList, ...others } = values;
  return {
    partitionList,
    // 服务器端返回了字符串。。。手动转一下数字，
    // 打个标记，找时间打后端一顿。
    pricePriedList: pricePriedList.map((it) => ({
      priedEndVal: parseInt(`${it.priedEndVal}`, 10),
      priedStartVal: it.priedStartVal !== null ? parseInt(`${it.priedStartVal}`, 10) : undefined,
      priedUnit: parseInt(`${it.priedUnit}`, 10),
    })),
    partitionInfoList: [],
    partitionUnitList: [],
    partitionValueList: [],
    ...others,
  };
};
/**
 * 将编辑数据转换成提交的数据格式
 * @param values QuoteEditData
 * @returns QuoteResponseData
 */
export const transportSubmitData = (values: QuoteEditData): QuoteResponseData => {
  const {
    defaultPriceFlag,
    projectName,
    pricePriedList,
    partitionList,
    partitionUnitList,
    partitionValueList,
    offerType,
    productType,
    offerId,
    productId,
    settleCurrency,
    gmtUnvalid,
    gmtValid,
    priceLevel,
    ...others
  } = values;

  // 表格中为了展示数据将对像展开了，提交时要还原回来
  const uniqPartitionCountry = _unionBy(partitionList, 'partitionName');

  const partitionInfoList = Object.keys(others)
    .filter((key) => key.includes('partitionPriceList'))
    .map((key) => others[key])
    .map((it) => {
      const { partitionName, partitionCode } = it[0];

      return {
        partitionName,
        partitionCode,
        partitionAreaList: pricePriedList.map((item, idx: number) => {
          return {
            ...item,
            partitionFirstContinueInfo: {
              firstUnit: _get(partitionUnitList, `[${idx}].firstUnit`),
              continueUnit: _get(partitionUnitList, `[${idx}].continueUnit`),
              firstVal: _get(partitionValueList, `[${idx}].firstVal`),
              continueVal: _get(partitionValueList, `[${idx}].continueVal`),
              firstPrice: it[idx].firstPrice,
              continuePrice: it[idx].continuePrice,
            },
          };
        }),
      };
    });

  return {
    defaultPriceFlag,
    projectName,
    partitionList: uniqPartitionCountry.map((it) => ({
      ...it,
      countryList: it.countryList.map((c) => {
        let projectVal;
        if (c.projectType === ProjectType.CITY) {
          projectVal = c.projectVal?.map((p) => `${p}`);
        } else {
          projectVal = c.projectVal;
        }
        return {
          ...c,
          projectVal,
        };
      }),
    })),
    gmtUnvalid,
    gmtValid,
    priceLevel,
    pricePriedList,
    partitionInfoList,
    offerType,
    offerId,
    productType,
    productId,
    settleCurrency,
  };
};

/**
 * 将编辑状态的分区国家列表转换成提交状态格式，反向转换函数为transportPartitionCountryDataOptionSSD
 * @param rows
 * @returns PartitionCountryData[]
 */
export const transportPartitionCountryDataFlat = (
  rows: PartitionEditTableData[],
): PartitionCountryData[] => {
  return rows?.map((it) => {
    const { id, countryId, countryCode, projectType, rowKey, projectVal } = it;

    const getProjectVal = () => {
      if (_isString(projectVal)) {
        return projectVal.split(' ');
      }
      return projectVal;
    };

    return {
      id,
      rowKey: rowKey || Math.random() * 10000,
      countryId: countryId?.value as number,
      countryName: countryId?.label,
      countryCode,
      projectType: projectType?.value as number,
      projectTypeText: projectType?.label,
      projectVal: getProjectVal()?.map((item) => {
        if (_isObject(item)) {
          return (item as OptionItemSSD).value;
        }
        return item;
      }),
      projectValText: getProjectVal()?.map((item) => {
        if (_isObject(item)) {
          return (item as OptionItemSSD).label;
        }
        return item;
      }),
    };
  });
};

/**
 * @param rows
 * @returns PartitionEditTableData[]
 */
export const transportPartitionCountryDataOptionSSD = (
  rows: PartitionCountryData[],
): PartitionEditTableData[] => {
  return rows?.map((it) => {
    const {
      id,
      rowKey,
      countryId,
      countryName,
      countryCode,
      projectType,
      projectTypeText,
      projectVal,
      projectValText,
    } = it;

    let projectAry;
    if (Array.isArray(projectVal)) {
      const isStringArray = _isString(_first(projectVal));
      if (isStringArray) {
        if (ProjectType.POSTALCODE === projectType) {
          projectAry = projectVal.join(' ') as string;
        } else if (projectType === ProjectType.CITY) {
          projectAry = projectVal.map((iit, idx) => ({
            value: parseInt(`${iit}`, 10),
            label: _get(projectValText, `[${idx}]`) as string,
          }));
        }
      } else {
        projectAry = projectVal.map((item, idx) => ({
          value: item,
          label: _get(projectValText, `[${idx}]`) as string,
        }));
      }
    }
    return {
      id,
      rowKey: rowKey || Math.random() * 10000,
      countryId: { value: countryId, label: countryName },
      countryCode,
      projectType: { value: projectType, label: projectTypeText },
      projectVal: projectAry,
    };
  });
};
