"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const logs_1 = require("./logs");
const links_1 = require("./links");
exports.rapid7UtilsClient = (config) => {
    config_1.setConfig(config);
    return {
        links: links_1.default,
        logs: logs_1.default,
    };
};
//# sourceMappingURL=index.js.map