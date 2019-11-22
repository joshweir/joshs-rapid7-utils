"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContinuanceLink = (thing) => typeof thing === 'object' && typeof thing.rel === 'string' && typeof thing.href === 'string';
exports.isResponseWithContinuanceLinks = (thing) => typeof thing === 'object' &&
    typeof thing.links === 'object' &&
    thing.links.filter(exports.isContinuanceLink).length === thing.links.length;
exports.isLogEvent = (thing) => typeof thing === 'object' &&
    typeof thing.timestamp === 'number' &&
    typeof thing.sequence_number === 'number' &&
    typeof thing.message === 'string';
exports.isLogEventWithLinks = (thing) => typeof thing === 'object' &&
    typeof thing.timestamp === 'number' &&
    typeof thing.sequence_number === 'number' &&
    typeof thing.message === 'string' &&
    typeof thing.links === 'object' &&
    thing.links.filter(exports.isContinuanceLink).length === thing.links.length;
exports.isResponseWithLogEvents = (thing) => typeof thing === 'object' &&
    typeof thing.events === 'object' &&
    thing.events.filter(exports.isLogEvent).length === thing.events.length;
exports.isResponseWithLogEventsWithLinks = (thing) => typeof thing === 'object' &&
    typeof thing.events === 'object' &&
    thing.events.filter(exports.isLogEventWithLinks).length === thing.events.length;
//# sourceMappingURL=types.js.map