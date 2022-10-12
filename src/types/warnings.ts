import type { PaginationParams, SSDBase } from './common';
import type { SwitchEnum } from '@/enum';

export interface WarningsSSD extends SSDBase {
  id: number;
  /**
   * 告警规则表达式
   */
  context: string;
  /**
   * 告警文案模板
   */
  copyTemp: string;
  /**
   * 有效状态1=是0=否
   */
  status: SwitchEnum;
  /**
   * 关联物模型编号
   */
  deviceCode: string;
  /**
   * 告警规则编号
   */
  warnCode: string;
  /**
   * 告警规则名称
   */
  warnName: string;
}

export interface AddWarningsParams extends Omit<WarningsSSD, 'id'> {
  id?: number;
}
export interface WarningsListParams extends PaginationParams {
  /**
   * 告警规则表达式
   */
  context?: string;
  /**
   * 告警文案模板
   */
  copyTemp?: string;
  /**
   * 有效状态1=是0=否
   */
  status: SwitchEnum;
  /**
   * 告警规则编号
   */
  warnCode?: string;
  /**
   * 告警规则名称
   */
  warnName?: string;
}
