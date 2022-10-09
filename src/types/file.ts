export const orginFileSymbol = Symbol('orginFileSymbol');
export enum FileUploadStateEnums {
  Initial = 'initial',
  Uploading = 'uploading',
  Fail = 'fail',
  Done = 'done',
}

export interface File {
  name: string;
  size: string | number;
  status: string;
  type: string;
  uid: string;
  url: string;
  tmpUrl: string;
  progress?: number;
  error?: boolean;
  [orginFileSymbol]?: globalThis.File;
}
