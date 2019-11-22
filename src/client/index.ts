import { Config, setConfig } from '../config';
import logs from './logs';
import links from './links';

export const rapid7UtilsClient = (config: Config) => {
  setConfig(config);

  return {
    links,
    logs,
  };
};
