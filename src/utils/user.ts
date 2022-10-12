import type { UserSSD } from '@/types/user';

const adminRole = 'ROL20220001';

export const isAdmin = (currentUser?: UserSSD | null) => {
  return currentUser?.roleDtos?.[0]?.roleNo === adminRole || currentUser?.userAccount === 'admin';
};
