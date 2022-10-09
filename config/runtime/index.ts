import './setConfigEnv';
import config from 'config';
import type { RuntimeConfig } from 'runtimeConfig';

const runtimeConfig = config.util.toObject();

export default runtimeConfig as RuntimeConfig;
