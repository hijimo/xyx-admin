import { useMemo } from 'react';
import moment from 'moment';
import { useQuery } from 'react-query';
import { DATE_FORMAT_FULL_TIME } from '@/utils/variables';
import { getServerTime } from '@/services/common';

const useServerTime = () => {
  const currentClientTime = useMemo(() => new Date().valueOf(), []);

  const { data: currentServerTime, refetch } = useQuery(
    ['getServerTime', currentClientTime],
    getServerTime,
    {
      select: (d) => d.data,
      staleTime: 60 * 1000,
    },
  );

  const formatTime = useMemo(() => {
    if (currentServerTime !== undefined) {
      return moment(currentServerTime).format(DATE_FORMAT_FULL_TIME);
    }
    return '';
  }, [currentServerTime]);

  return { currentServerTime, refetch, formatTime };
};

export default useServerTime;
