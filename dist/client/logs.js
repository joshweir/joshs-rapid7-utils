"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("../url");
const util_1 = require("../util");
const config_1 = require("../config");
const types_1 = require("../types");
const toLogEventWithContextLink = (logEvent) => (Object.assign({}, logEvent, { contextLink: logEvent.links.filter(({ rel }) => rel === 'Context').map(({ href }) => href)[0] }));
const toLogEventWithHighlightedLog = (highlightedSequenceNumber) => (logEvent) => (Object.assign({}, logEvent, { highlighted: logEvent.sequence_number === highlightedSequenceNumber }));
const buildOperationIdLink = ({ operationId, sentTimestamp, logFilterId, }) => `${config_1.getConfig().apiBaseUrl}/log_search/query/logs/${logFilterId}/?from=${sentTimestamp - 7 * util_1.DAYS}&to=${sentTimestamp +
    7 * util_1.DAYS}&query=where(%2F${util_1.parsev4(operationId)}%2F)`;
const buildQueryLink = ({ query, sentTimestamp, logFilterId, }) => `${config_1.getConfig().apiBaseUrl}/log_search/query/logs/${logFilterId}/?from=${sentTimestamp - 7 * util_1.DAYS}&to=${sentTimestamp +
    7 * util_1.DAYS}&query=where(${query})`;
const byOperationId = ({ operationId, sentTimestamp, rapid7LogFilterIds }) => __awaiter(this, void 0, void 0, function* () {
    const logEvents = [];
    for (const logFilterId of rapid7LogFilterIds) {
        const response = yield url_1.fetchR7(buildOperationIdLink({ operationId, sentTimestamp, logFilterId }));
        const data = yield response.json();
        if (!types_1.isResponseWithLogEventsWithLinks(data)) {
            throw new Error(`response does not contain log events: ${JSON.stringify(data, null, 2)}`);
        }
        logEvents.push(...data.events.slice(0, config_1.getConfig().maxLogEventsPerFilter));
    }
    return logEvents.sort((a, b) => a.timestamp - b.timestamp).map(toLogEventWithContextLink);
});
const byQuery = ({ query, sentTimestamp, rapid7LogFilterIds, }) => __awaiter(this, void 0, void 0, function* () {
    const logEvents = [];
    for (const logFilterId of rapid7LogFilterIds) {
        const response = yield url_1.fetchR7(buildQueryLink({ query, sentTimestamp, logFilterId }));
        const data = yield response.json();
        if (!types_1.isResponseWithLogEventsWithLinks(data)) {
            throw new Error(`response does not contain log events: ${JSON.stringify(data, null, 2)}`);
        }
        logEvents.push(...data.events.slice(0, config_1.getConfig().maxLogEventsPerFilter));
    }
    return logEvents.sort((a, b) => a.timestamp - b.timestamp).map(toLogEventWithContextLink);
});
const surroundingContext = (contextUrl, sequenceNumber) => __awaiter(this, void 0, void 0, function* () {
    const response = yield url_1.fetchR7(contextUrl);
    const data = yield response.json();
    if (!types_1.isResponseWithLogEvents(data)) {
        throw new Error(`response does not contain log events: ${JSON.stringify(data, null, 2)}`);
    }
    return data.events.map(toLogEventWithHighlightedLog(sequenceNumber));
});
exports.default = {
    get: {
        byQuery,
        byOperationId,
        surroundingContext,
    },
};
//# sourceMappingURL=logs.js.map