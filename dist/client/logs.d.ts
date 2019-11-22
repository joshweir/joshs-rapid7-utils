import { TLogEventWithContextLink, TLogEventMaybeHighlighted } from '../types';
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