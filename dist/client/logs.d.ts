declare type TLogEvent = {
    timestamp: number;
    sequence_number: number;
    message: string;
};
declare type TLogEventWithContextLink = TLogEvent & {
    contextLink: string;
};
export declare type TLogEventMaybeHighlighted = TLogEvent & {
    highlighted: boolean;
};
declare const _default: {
    get: {
        byQuery: ({ query, sentTimestamp, rapid7LogFilterIds, }: {
            query: string;
            sentTimestamp: number;
            rapid7LogFilterIds: string[];
        }) => Promise<TLogEventWithContextLink[]>;
        byOperationId: ({ operationId, sentTimestamp, rapid7LogFilterIds }: {
            operationId: string;
            sentTimestamp: number;
            rapid7LogFilterIds: string[];
        }) => Promise<TLogEventWithContextLink[]>;
        surroundingContext: (contextUrl: string, sequenceNumber: number) => Promise<TLogEventMaybeHighlighted[]>;
    };
};
export default _default;
//# sourceMappingURL=logs.d.ts.map