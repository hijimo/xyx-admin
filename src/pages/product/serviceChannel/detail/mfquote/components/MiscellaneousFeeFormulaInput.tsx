import React, { useCallback, useMemo } from 'react';
import escapeStringRegexp from 'escape-string-regexp';
import _keyBy from 'lodash/keyBy';
import _sortBy from 'lodash/sortBy';
import { useQuery } from 'react-query';
import { Mentions } from 'antd';
import { getServiceChannelDetail } from '@/services/serviceChannel';

export interface MiscellaneousFeeFormulaInputValue {
  value: string;
  text: string;
  variables: string[];
}

export interface MiscellaneousFeeFormulaInputProps {
  value?: MiscellaneousFeeFormulaInputValue;
  onChange?: (value: MiscellaneousFeeFormulaInputValue) => void;
  channelId: number | string;
}

const MiscellaneousFeeFormulaInput: React.FC<MiscellaneousFeeFormulaInputProps> = ({
  value,
  onChange,
  channelId,
}) => {
  const { data } = useQuery(
    ['serviceChannelDetail', { channelId }],
    () => getServiceChannelDetail({ id: channelId }),
    {
      enabled: !!channelId,
      select: (d) => d.data.billingOffers,
    },
  );

  const mappedData = useMemo(() => _keyBy(data, (d) => `@${d.expenseItemName}`), [data]);

  const replaceRegExp = useMemo(() => {
    // 先按字符长度排序后，
    // 再遍历转义费用项名
    const regexpString =
      _sortBy(data, (o) => o.expenseItemName.length * -1)
        ?.map((d) => escapeStringRegexp(`@${d.expenseItemName}`))
        .join('|') || '';
    return new RegExp(regexpString, 'g');
  }, [data]);

  const presentValue = value?.text;

  const handleChange = useCallback(
    (text: string) => {
      const variables: string[] = [];
      const metionsValue = text.replaceAll(replaceRegExp, (match) => {
        const variable = mappedData[match]?.expenseCode;
        if (variable !== undefined) {
          variables.push(variable);
        }
        return `${variable ?? ''}`;
      });
      const finalValue = { value: metionsValue, text, variables };
      onChange?.(finalValue);
    },
    [onChange, replaceRegExp, mappedData],
  );

  return (
    <Mentions rows={5} value={presentValue} onChange={handleChange}>
      {data?.map((it) => (
        <Mentions.Option value={it.expenseItemName} key={`${it.id}`}>
          {it.expenseItemName}
        </Mentions.Option>
      ))}
    </Mentions>
  );
};

export default MiscellaneousFeeFormulaInput;
