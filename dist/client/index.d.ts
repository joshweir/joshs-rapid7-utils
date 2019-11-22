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
            }) => Promise<({
                timestamp: number;
                sequence_number: number;
                message: string;
            } & {
                contextLink: string;
            })[]>;
            byOperationId: ({ operationId, sentTimestamp, rapid7LogFilterIds }: {
                operationId: string;
                sentTimestamp: number;
                rapid7LogFilterIds: string[];
            }) => Promise<({
                timestamp: number;
                sequence_number: number;
                message: string;
            } & {
                contextLink: string;
            })[]>;
            surroundingContext: (contextUrl: string, sequenceNumber: number) => Promise<import("./logs").TLogEventMaybeHighlighted[]>;
        };
    };
};
//# sourceMappingURL=index.d.ts.map