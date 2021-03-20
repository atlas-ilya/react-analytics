export declare class Admin {
    token: string;
    constructor(token: string);
}
export declare let admin: any;
export declare function initialize(token: string): void;
export declare function identify(user: any): void;
export declare function track(event: string, options?: object, eventTagsArray?: string[]): void;
declare const _default: {
    initialize: typeof initialize;
    track: typeof track;
    identify: typeof identify;
};
export default _default;
