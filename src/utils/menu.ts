import type { Dictionary } from 'lodash';
import type { MenuDataItem } from '@ant-design/pro-layout';
import _compact from 'lodash/compact';
import _keyBy from 'lodash/keyBy';
import _mapValues from 'lodash/mapValues';
import type { UserMenuItemSSD, Flattenable, MapFlattenable } from '@/types';

export const mapMenuToStandard = (
  authorityData: UserMenuItemSSD[],
  menuMap: Dictionary<MenuDataItem>,
): MenuDataItem[] =>
  _compact(
    authorityData.map((d) => {
      const menu = menuMap[`${d.resourceKey}`];
      return (
        menu && {
          ...menu,
          // 当遇到没有指定resourceKey的菜单项时 当做外链处理 外链也为空时 当做404页面路由处理
          path: menu.path ?? d.resourceUrl ?? '/404',
          // icon: d.resourceIcon,
          children: mapMenuToStandard(d.children ?? [], menuMap),
          // target: '_blank'
        }
      );
    }),
  );

export function getFlattenMenu<T extends Flattenable<T>>(data: T[]): T[] {
  return data.reduce(
    (memo, d) => memo.concat(d, d.children ? getFlattenMenu(d.children) : []),
    [] as T[],
  );
}

export function getMenuMap<T extends MapFlattenable<T>>(data: T[]) {
  return _keyBy(
    getFlattenMenu(data).filter((d) => d.resourceKey != null),
    'resourceKey',
  );
}

export const getAuthroityMap = (data: UserRuleMenuItemSSD[]): Dictionary<boolean> =>
  _mapValues(getMenuMap(data), () => true);
