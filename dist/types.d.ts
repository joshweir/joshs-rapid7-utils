export declare type TContinuanceLink = {
    rel: string;
    href: string;
};
export declare const isContinuanceLink: (thing: any) => thing is TContinuanceLink;
export declare type TResponseWithContinuanceLinks = {
    links: TContinuanceLink[];
};
export declare const isResponseWithContinuanceLinks: (thing: any) => thing is TResponseWithContinuanceLinks;
export declare type TLogEvent = {
    timestamp: number;
    sequence_number: number;
    message: string;
};
export declare const isLogEvent: (thing: any) => thing is TLogEvent;
export declare type TLogEventWithLinks = TLogEvent & {
    links: TContinuanceLink[];
};
export declare const isLogEventWithLinks: (thing: any) => thing is TLogEventWithLinks;
export declare type TLogEventWithContextLink = TLogEvent & {
    contextLink: string;
};
export declare type TResponseWithLogEvents = {
    events: TLogEvent[];
};
export declare const isResponseWithLogEvents: (thing: any) => thing is TResponseWithLogEvents;
export declare type TResponseWithLogEventsWithLinks = {
    events: TLogEventWithLinks[];
};
export declare const isResponseWithLogEventsWithLinks: (thing: any) => thing is TResponseWithLogEventsWithLinks;
export declare type TLogEventMaybeHighlighted = TLogEvent & {
    highlighted: boolean;
};
//# sourceMappingURL=types.d.ts.map