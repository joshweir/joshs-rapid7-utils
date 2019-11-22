import { Config } from '../config';
export declare const rapid7UtilsClient: (config: Config) => {
    links: {
        build: {
            byOperationId: ({ operationId, sentTimestamp, rapid7LogFilterIds, }: {
                operationId: string;
                sentTimestamp: number;
                rapid7LogFilterIds: string[];
            }) => string;
        };
    };
    logs: {
        get: {
            byQuery: ({ query, sentTimestamp, rapid7LogFilterIds, }: {
                query: string;
                sentTimestamp: number;
                rapid7LogFilterIds: string[];
            }) => Promise<import("..").TLogEventWithContextLink[]>;
            byOperationId: ({ operationId, sentTimestamp, rapid7LogFilterIds }: {
                operationId: string;
                sentTimestamp: number;
                rapid7LogFilterIds: string[];
            }) => Promise<import("..").TLogEventWithContextLink[]>;
            surroundingContext: (contextUrl: string, sequenceNumber: number) => Promise<import("..").TLogEventMaybeHighlighted[]>;
        };
    };
};
//# sourceMappingURL=index.d.ts.map