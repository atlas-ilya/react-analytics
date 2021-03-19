import { User } from './user'


declare let userEvents: User[];
declare let userEvent: any;
declare let userParams: any;
declare let admin: any;
declare function identify(user: any): void;
declare function track(event: string, options?: object, eventTagsArray?: string[]): void;

