import { RequestInfo } from 'node-fetch';
export declare type TContinuanceLink = {
    rel: string;
    href: string;
};
export declare const isContinuanceLink: (thing: any) => thing is TContinuanceLink;
export declare const fetchWithApiKey: (url: RequestInfo) => Promise<import("node-fetch").Response>;
export declare const fetchR7: (url: RequestInfo) => Promise<import("node-fetch").Response>;
//# sourceMappingURL=url.d.ts.map