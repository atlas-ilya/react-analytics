export interface IEvent {
    userId?: string | null;
    eventName?: string;
    customParams?: {};
    eventTagsArray?: string[];
    path?: string;
    date?: Date;
    userBrowserName?: string;
    userBrowserVersion?: string;
    userDeviceType?: string;
    sessionId?: string;
    localClientAgent?: string;
}
export declare class User implements IEvent {
}
