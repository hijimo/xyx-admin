import { useCallback } from 'react';
import { useHistory, useModel } from 'umi';
import type { LoginInfoSSD } from '@/types';
import { getMyProfile } from '@/services/user';

const useSettlement = () => {
  const history = useHistory();
  const { initialState } = useModel('@@initialState');

  const handleSettlementRegister = useCallback(async () => {
    if (!initialState?.currentUser) {
      const res = await getMyProfile();
      if (res.retCode === '0001007' && res.data != null) {
        const data = res.data as unknown;
        const { registerUri, appNo } = data as LoginInfoSSD;
        window.location.href = `${registerUri}?appNo=${appNo}&redirectUrl=${window.location.href}`;
      }
    } else {
      history.push('/business/apply');
    }
  }, [initialState?.currentUser, history]);

  const handleSettlement = useCallback(async () => {
    if (!initialState?.currentUser) {
      const res = await getMyProfile();
      if (res.retCode === '0001007' && res.data != null) {
        const data = res.data as unknown;
        const { loginUri, appNo } = data as LoginInfoSSD;
        window.location.href = `${loginUri}?appNo=${appNo}&redirectUrl=${window.location.href}`;
      }
    } else {
      history.push('/business/apply');
    }
  }, [initialState?.currentUser, history]);

  return {
    handleSettlement,
    handleSettlementRegister,
  };
};

export default useSettlement;
