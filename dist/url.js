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
const node_fetch_1 = require("node-fetch");
const config_1 = require("./config");
const HTTP_ACCEPTED = 202;
const HTTP_OK = 200;
exports.isContinuanceLink = (thing) => typeof thing === 'object' && typeof thing.rel === 'string' && typeof thing.href === 'string';
const isResponseWithContinuanceLinks = (thing) => typeof thing === 'object' &&
    typeof thing.links === 'object' &&
    thing.links.filter(exports.isContinuanceLink).length === thing.links.length;
const parseContinuanceLink = (data) => {
    if (!isResponseWithContinuanceLinks(data)) {
        throw new Error(`no continuance link found: ${JSON.stringify(data, null, 2)}`);
    }
    const selfLink = data.links.find(({ rel }) => rel === 'Self');
    if (!selfLink) {
        throw new Error(`no self continuance link found: ${JSON.stringify(data, null, 2)}`);
    }
    return selfLink.href;
};
exports.fetchWithApiKey = (url) => node_fetch_1.default(url, {
    headers: {
        'x-api-key': config_1.getConfig().apiKey,
    },
});
exports.fetchR7 = (url) => __awaiter(this, void 0, void 0, function* () {
    const response = yield exports.fetchWithApiKey(url);
    if ([HTTP_ACCEPTED, HTTP_OK].indexOf(response.status) === -1) {
        throw new Error(`in fetchR7, could not fetch ${url.toString()}: (${response.status}) ${response.statusText}`);
    }
    if (response.status === HTTP_ACCEPTED) {
        const data = yield response.json();
        return exports.fetchWithApiKey(parseContinuanceLink(data));
    }
    return response;
});
//# sourceMappingURL=url.js.map