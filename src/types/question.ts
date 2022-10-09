import { BooleanEnum } from '@/enum';
import type { PaginationParams, SSDBase } from './common';

export interface QuestionListParams extends PaginationParams {}
export interface QuestionSSD extends SSDBase {
  /**
   * id
   */
  questionId: number;
  // 章节id
  chapterId: number;
  /**
   * 问题
   */
  questionContent?: string;
  /**
   * 排序
   */
  questionSort?: number;
  /**
   * 线索
   */
  questionClue: string;
}

export interface QuestionOptionSSD extends SSDBase {
  optionId: number;
  /**
   * 问题id
   */
  questionId: number;
  /**
   * 选项内容
   */
  optionContent: string;
  /**
   * 是否正确答案：0错误1正确
   */
  optionCorrect: BooleanEnum;
}
