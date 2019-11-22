export declare type Config = {
    apiKey: string;
    apiBaseUrl: string;
    uiBaseUrl?: string;
    maxLogEventsPerFilter?: number;
};
export declare const isConfig: (thing: any) => thing is Config;
export declare const setConfig: (inputConfig: Config) => void;
export declare const getConfig: () => Config;
//# sourceMappingURL=config.d.ts.map