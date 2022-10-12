import { stringify } from 'qs';
import _concat from 'lodash/concat';
import { printPdf, getMergedPDFURL } from '@kuaiyou/print-utils';

declare global {
  interface Window {
    pdfUtils?: {
      showPDF: (url: string) => () => Promise<void>;
    };
  }
}

export const exportHelper = (url: string, params?: Record<string, string | number | undefined>) => {
  const href = `${url}${stringify(params, { addQueryPrefix: true })}`;
  const a = document.createElement('a');
  a.href = href;
  a.click();
};

export const printPDF = async (data: string | string[]) => {
  const pdfs = _concat([], data);
  if (window.pdfUtils) {
    const pdfFile = await getMergedPDFURL(pdfs);
    await window.pdfUtils.showPDF(pdfFile);
  } else {
    await printPdf(data);
  }
};
