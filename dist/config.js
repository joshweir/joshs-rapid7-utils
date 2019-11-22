"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConfig = (thing) => typeof thing === 'object' &&
    typeof thing.apiKey === 'string' &&
    typeof thing.apiBaseUrl === 'string' &&
    ['undefined', 'string'].indexOf(typeof thing.uiBaseUrl) !== -1 &&
    ['undefined', 'number'].indexOf(typeof thing.maxLogEventsPerFilter) !== -1;
let config;
const validateConfig = ({ apiKey, apiBaseUrl }) => {
    if (!apiKey || typeof apiKey !== 'string') {
        throw new Error(`apiKey must be a string, received: ${apiKey}`);
    }
    if (!apiBaseUrl || typeof apiBaseUrl !== 'string') {
        throw new Error(`apiBaseUrl must be a string, received: ${apiBaseUrl}`);
    }
};
exports.setConfig = (inputConfig) => {
    validateConfig(inputConfig);
    config = Object.assign({}, inputConfig, { maxLogEventsPerFilter: inputConfig.maxLogEventsPerFilter || 5 });
};
exports.getConfig = () => {
    console.log(config);
    if (!exports.isConfig(config)) {
        throw new Error(`invalid config`);
    }
    return config;
};
//# sourceMappingURL=config.js.map