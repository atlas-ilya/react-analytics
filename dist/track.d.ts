export declare class Admin {
    token: string;
    baseURL: string;
    constructor(token: string, baseURL: string);
}
export declare class User {
    userId: string | null;
    eventName: string;
    customParams: {};
    eventTagsArray: string;
    path: string;
    date: string;
    userBrowserName: string;
    userBrowserVersion: string;
    userDeviceType: string;
    sessionId: string;
    localClientAgent: string;
    constructor(userId: string);
}
export declare var admin: Admin;
export declare var userEvents: User[];
export declare let userEvent: User;
export declare var userParams: any;
export declare function initialize(token: string, BaseURL: string): void;
export declare function identify(user: any): void;
export declare function track(event: string, options?: object, eventTagsArray?: string[]): void;
export declare function sendUser(event: object): Promise<void>;
export declare function sendEvent(): Promise<void>;
declare const _default: {
    initialize: typeof initialize;
    track: typeof track;
    identify: typeof identify;
};
export default _default;
