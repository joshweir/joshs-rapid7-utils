export type TContinuanceLink = {
  rel: string;
  href: string;
};
export const isContinuanceLink = (thing: any): thing is TContinuanceLink =>
  typeof thing === 'object' && typeof thing.rel === 'string' && typeof thing.href === 'string';

export type TResponseWithContinuanceLinks = {
  links: TContinuanceLink[];
};
export const isResponseWithContinuanceLinks = (thing: any): thing is TResponseWithContinuanceLinks =>
  typeof thing === 'object' &&
  typeof thing.links === 'object' &&
  thing.links.filter(isContinuanceLink).length === thing.links.length;

export type TLogEvent = {
  timestamp: number;
  sequence_number: number;
  message: string;
};
export const isLogEvent = (thing: any): thing is TLogEvent =>
  typeof thing === 'object' &&
  typeof thing.timestamp === 'number' &&
  typeof thing.sequence_number === 'number' &&
  typeof thing.message === 'string';

export type TLogEventWithLinks = TLogEvent & {
  links: TContinuanceLink[];
};
export const isLogEventWithLinks = (thing: any): thing is TLogEventWithLinks =>
  typeof thing === 'object' &&
  typeof thing.timestamp === 'number' &&
  typeof thing.sequence_number === 'number' &&
  typeof thing.message === 'string' &&
  typeof thing.links === 'object' &&
  thing.links.filter(isContinuanceLink).length === thing.links.length;

export type TLogEventWithContextLink = TLogEvent & {
  contextLink: string;
};

export type TResponseWithLogEvents = {
  events: TLogEvent[];
};
export const isResponseWithLogEvents = (thing: any): thing is TResponseWithLogEvents =>
  typeof thing === 'object' &&
  typeof thing.events === 'object' &&
  thing.events.filter(isLogEvent).length === thing.events.length;

export type TResponseWithLogEventsWithLinks = {
  events: TLogEventWithLinks[];
};
export const isResponseWithLogEventsWithLinks = (thing: any): thing is TResponseWithLogEventsWithLinks =>
  typeof thing === 'object' &&
  typeof thing.events === 'object' &&
  thing.events.filter(isLogEventWithLinks).length === thing.events.length;

export type TLogEventMaybeHighlighted = TLogEvent & {
  highlighted: boolean;
};
