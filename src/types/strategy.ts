import { BooleanEnum } from '@/enum';
import type { PaginationParams, SSDBase } from './common';

export interface StrategyListParams extends PaginationParams {}

export interface AddStrategyParams {}
export interface StrategySSD extends SSDBase {
  /**
   * id
   */
  strategyId: number;
  /**
   * 攻略主题
   */
  strategyName: string;
  /**
   * 背景介绍
   */
  strategyBackground: string;
  /**
   * 个人奖策略关联id
   */
  rewardStrategyId: number;
  /**
   * 个人奖关联id
   */
  rewardId: number;
  /**
   * 总密钥
   */
  finalKey: string;
  /**
   * 总密钥提示
   */
  finalKeyTips: string;
  /**
   * 终极宝箱id
   */
  finalRewardId: number;

  /**
   * 时效配置id
   */
  timeLimitId: number;
  /**
   * 是否下架：0正常1下架
   */
  strategyStatus: BooleanEnum;
  filesJson: string;
}
