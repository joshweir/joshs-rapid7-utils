"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const util_1 = require("../util");
const buildLogFilterQueryParam = (rapid7LogFilterIds) => `%5B${rapid7LogFilterIds.map((f) => `%22${f}%22`).join(`%2C`)}%5D`;
const byOperationId = ({ operationId, sentTimestamp, rapid7LogFilterIds, }) => `${`${config_1.getConfig().uiBaseUrl}/search?`}${`from=${sentTimestamp - 7 * util_1.DAYS}&to=${sentTimestamp +
    7 * util_1.DAYS}&`}${`query=where(%2F${util_1.parsev4(operationId)}%2F)&`}${`logs=${buildLogFilterQueryParam(rapid7LogFilterIds)}`}`;
exports.default = {
    build: {
        byOperationId,
    },
};
//# sourceMappingURL=links.js.map