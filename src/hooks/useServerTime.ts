import { useMemo } from 'react';
import moment from 'moment';
import { useQuery } from 'react-query';
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
      return moment(currentServerTime).format('yyyy-MM-DD HH:mm:SS');
    }
    return '';
  }, [currentServerTime]);

  return { currentServerTime, refetch, formatTime };
};

export default useServerTime;
