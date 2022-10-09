import { stringify } from 'qs';
import moment from 'moment';
import _concat from 'lodash/concat';
import { printPdf, getMergedPDFURL } from '@kuaiyou/print-utils';
import {
  DATE_FORMAT_FULL_TIME,
  DATE_FORMAT_DATE,
  DATE_FORMAT_DATETIME_HOURS,
  DATE_FORMAT_DATETIME_MINUTES,
} from '@/utils/variables';

declare global {
  interface Window {
    pdfUtils?: {
      showPDF: (url: string) => () => Promise<void>;
    };
  }
}

export const printPDF = async (data: string | string[]) => {
  const pdfs = _concat([], data);
  if (window.pdfUtils) {
    const pdfFile = await getMergedPDFURL(pdfs);
    await window.pdfUtils.showPDF(pdfFile);
  } else {
    await printPdf(data);
  }
};

export const exportHelper = (url: string, params?: Record<string, string | number | undefined>) => {
  const href = `${url}${stringify(params, { addQueryPrefix: true })}`;
  const a = document.createElement('a');
  a.href = href;
  a.click();
};

export const convertRange = (
  range: [string, string] | undefined | null,
  rangeName: string,
  startName: string,
  endName: string,
  format: 'day' | 'hour' | 'minute' | 'second' = 'minute',
) => {
  const formatMap = {
    day: DATE_FORMAT_DATE,
    hour: DATE_FORMAT_DATETIME_HOURS,
    minute: DATE_FORMAT_DATETIME_MINUTES,
    second: DATE_FORMAT_FULL_TIME,
  };

  return {
    [startName]: range && moment(range[0]).format(formatMap[format]),
    [endName]: range && moment(range[1]).format(formatMap[format]),
    [rangeName]: undefined,
  };
};

export const convertRangeToBeginEnd = (
  range: [string, string] | undefined | null,
  rangeName: string,
  prefix?: string,
  format?: 'day' | 'hour' | 'minute' | 'second',
) => {
  return convertRange(
    range,
    rangeName,
    `${prefix ?? rangeName}Begin`,
    `${prefix ?? rangeName}End`,
    format,
  );
};

export const convertRangeToStartEnd = (
  range: [string, string] | undefined | null,
  rangeName: string,
  prefix?: string,
  format?: 'day' | 'hour' | 'minute' | 'second',
) => {
  return convertRange(
    range,
    rangeName,
    `${prefix ?? rangeName}Start`,
    `${prefix ?? rangeName}End`,
    format,
  );
};
