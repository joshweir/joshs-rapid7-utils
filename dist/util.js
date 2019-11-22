"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAYS = 24 * 60 * 60 * 1000;
const v4RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i;
exports.parsev4 = (text) => {
    const result = v4RegExp.exec(text);
    return result ? result[0] : text;
};
//# sourceMappingURL=util.js.map