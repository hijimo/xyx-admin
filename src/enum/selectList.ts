import { ResourceTypeDesc } from './common';

// 资源类型下拉列表
export const ResourceTypeList = Object.keys(ResourceTypeDesc).map((key) => ({
  value: key,
  label: ResourceTypeDesc[key],
}));
