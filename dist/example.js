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
const _1 = require("./");
const run = () => __awaiter(this, void 0, void 0, function* () {
    const operationId = 'c927b7f7-0c77-4287-b430-6cc1a3d427ca';
    const sentTimestamp = 1572061666930;
    const rapid7LogFilterIds = [
        '6d75e451-a5cf-4bd3-a3e6-3b51b6316f3f',
        '9f578be3-48d7-4e2c-94c6-a2fab4153b9a',
    ];
    const config = {
        apiKey: process.env.RAPID7_API_KEY || '',
        apiBaseUrl: process.env.RAPID7_API_BASE_URL || '',
        uiBaseUrl: process.env.RAPID7_UI_BASE_URL,
    };
    const client = _1.rapid7UtilsClient(config);
    const link = client.links.build.byOperationId({
        operationId,
        sentTimestamp,
        rapid7LogFilterIds,
    });
    console.log('link', link);
    const result = yield client.logs.get.byOperationId({
        operationId,
        sentTimestamp,
        rapid7LogFilterIds,
    });
    console.log('log entries length', result.length);
    console.log('first log');
    console.log(JSON.stringify(result[0], null, 2));
    const surroundingResult = yield client.logs.get.surroundingContext(result[0].contextLink, result[0].sequence_number);
    console.log('first log surrounding');
    console.log(JSON.stringify(surroundingResult, null, 2));
});
run().catch((err) => {
    console.error('oh dear!', err);
});
//# sourceMappingURL=example.js.map