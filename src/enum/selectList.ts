import _map from 'lodash/map';
import type { SettlementType } from './common';
import { SettlementTypeDesc, WeightValueType, WeightValueTypeDesc } from './common';
import {
  PackageDerelictionStateDesc,
  PackageStateFilterDesc,
  PackageTerminalStateDesc,
} from './package';
import { ServiceType, ServiceTypeDesc } from './provider';

export const SettlementSelectList = _map(SettlementTypeDesc, (value, key) => ({
  text: value.text,
  value: +key as SettlementType,
}));

export const ServiceTypeSelectList = [
  { text: ServiceTypeDesc[ServiceType.BASE].text, value: ServiceType.BASE },
  { text: ServiceTypeDesc[ServiceType.POD].text, value: ServiceType.POD },
  {
    text: ServiceTypeDesc[ServiceType.CLEARANCE].text,
    value: ServiceType.CLEARANCE,
  },
  {
    text: ServiceTypeDesc[ServiceType.COD].text,
    value: ServiceType.COD,
  },
];

// 重量取值下拉列表
export const WeightValueTypeList = [
  {
    value: WeightValueType.ROUNDED,
    label: WeightValueTypeDesc[WeightValueType.ROUNDED],
  },
  {
    value: WeightValueType.UP,
    label: WeightValueTypeDesc[WeightValueType.UP],
  },
  {
    value: WeightValueType.FLOOR,
    label: WeightValueTypeDesc[WeightValueType.FLOOR],
  },
  {
    value: WeightValueType.ACTUAL,
    label: WeightValueTypeDesc[WeightValueType.ACTUAL],
  },
];

export const PackageStateList = _map(PackageStateFilterDesc, (value, key) => ({
  value: +key,
  label: value.text,
}));

export const PackageDerelictionStateList = _map(PackageDerelictionStateDesc, (value, key) => ({
  value: +key,
  label: value!.text,
}));

export const PackageTerminalStateList = _map(PackageTerminalStateDesc, (value, key) => ({
  value: +key,
  label: value!.text,
}));
