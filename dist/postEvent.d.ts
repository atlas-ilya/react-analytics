import { User } from './user';
export declare class Admin {
    token: string;
    constructor(token: string);
}
export declare let admin: any;
export declare function initialize(token: string): void;
export declare function sendUser(event: object): void;
export declare function sendEvent(events: User[]): void;
