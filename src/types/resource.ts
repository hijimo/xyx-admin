import { BooleanEnum } from '@/enum';

export interface ResourceSSD {
  children: ResourceSSD[];
  /**
   * 子节点集合大小
   */
  childrenSize: number;
  /**
   * 是否有字节点
   */
  hasChildren: boolean;
  id: number;
  /**
   * 父节点id
   */
  parentId: number;
  /**
   * 菜单组件
   */
  resourceComponent: string;
  /**
   * 资源key
   */
  resourceKey: string;
  /**
   * 资源等级
   */
  resourceLevel: number;
  /**
   * 资源名称
   */
  resourceName: string;
  /**
   * 菜单url
   */
  resourceUrl: string;
  /**
   * 是否被选择 0否1是
   */
  selectFlag: BooleanEnum;
  value: number;
}
