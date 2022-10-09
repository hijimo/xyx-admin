import produce from 'immer';
import { gmtCreate, remark } from './commonColumns';
import { operatorName } from './operationLogColumns';

const remarkGmtCreate = produce(gmtCreate, (draft) => {
  draft.title = '备注时间';
  draft.fixed = false;
});

const remarkContent = produce(remark, (draft) => {
  draft.title = '备注内容';
});

const remarkName = produce(operatorName, (draft) => {
  draft.title = '备注人';
});

export const remarkColumns = {
  remarkGmtCreate,
  remarkName,
  remarkContent,
};
