import {ConfigModel} from '../model/config.model';
import DEBUG from './debug';
import STAGING from './staging';
import PRODUCTION from './production';
import {NativeModules} from 'react-native';

type EnvEnum = 'debug' | 'staging' | 'production';
const ENV: EnvEnum = NativeModules.EnvConfig.ENV;
let config: ConfigModel;

config = PRODUCTION;

if (ENV === 'debug') {
  config = DEBUG;
} else if (ENV === 'staging') {
  config = STAGING;
}

export default config;
