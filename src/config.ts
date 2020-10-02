export type Config = {
  apiKey: string;
  apiBaseUrl: string;
  uiBaseUrl?: string;
  maxLogEventsPerFilter?: number;
};
export const isConfig = (thing: any): thing is Config =>
  typeof thing === 'object' &&
  typeof thing.apiKey === 'string' &&
  typeof thing.apiBaseUrl === 'string' &&
  ['undefined', 'string'].indexOf(typeof thing.uiBaseUrl) !== -1 &&
  ['undefined', 'number'].indexOf(typeof thing.maxLogEventsPerFilter) !== -1;

let config: Config;

const validateConfig = ({ apiKey, apiBaseUrl }: Config) => {
  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error(`apiKey must be a string, received: ${apiKey}`);
  }

  if (!apiBaseUrl || typeof apiBaseUrl !== 'string') {
    throw new Error(`apiBaseUrl must be a string, received: ${apiBaseUrl}`);
  }
}

export const setConfig = (inputConfig: Config) => {
  validateConfig(inputConfig);

  config = {
    ...inputConfig,
    maxLogEventsPerFilter: inputConfig.maxLogEventsPerFilter || 5,
  };
}

export const getConfig = () => {
  if (!isConfig(config)) {
    throw new Error(`invalid config`);
  }

  return config;
};
