
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { get_browser } from './getBrowser'
import axios from "axios";

export class Admin {
    token: string;
    baseURL:string;

    constructor(token: string,baseURL:string) {
        this.token = token;
        this.baseURL = baseURL;
    }

}




export class User {
    userId: string | null;
    eventName: string = '';
    customParams: {} = {};
    eventTagsArray: string = '';
    path: string = '';
    date: string = '';
    userBrowserName: string = '';
    userBrowserVersion: string = '';
    userDeviceType: string = '';
    sessionId: string = '';
    localClientAgent: string = '';
    constructor(userId: string) {
        this.userId = userId;
    }
}

export var admin: Admin;
export var userEvents: User[];
export let userEvent: User;
export var userParams: any;



export function initialize(token: string,BaseURL : string): void {
    admin = new Admin(token,BaseURL);
    userEvents = [];
}

export function identify(user: any): void {
    if (!admin.token) {
        console.error('Call function initialize');
        return;
    }
    userEvent = new User(user.objectId);
    userParams = {
        id: user.objectId,
        email: user.email,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        tags: JSON.stringify(user.tags),
        userRole: user.userRole,
    }
    const object = { id: "" + Math.random().toString(36).substr(2, 9), timestamp: new Date().getTime() }
    localStorage.setItem("SessionId", JSON.stringify(object));
    sendUser(userParams);
    (async () => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId;
    })().then((visitorId) => localStorage.setItem("localKey", JSON.stringify(visitorId)));

};


export function track(event: string, options?: object, eventTagsArray?: string[]): void {
    if (!userEvent) {
        console.error('You need to identify the user, ' +
            'use function widget.identify(user)');
        return;
    }
    let object = JSON.parse("" + localStorage.getItem("SessionId"));

    if (object.timestamp <= new Date().getTime() - 18000000) {
        const newObj = { id: "" + Math.random().toString(36).substr(2, 8), timestamp: new Date().getTime() }
        localStorage.setItem("SessionId", JSON.stringify(newObj));
        object = newObj;
    }
    if (options) {
        userEvent.customParams = JSON.stringify(options);
    } else userEvent.customParams = JSON.stringify({});

    if (eventTagsArray) {
        userEvent.eventTagsArray = JSON.stringify(eventTagsArray);
    } else userEvent.eventTagsArray = JSON.stringify([]);

    const browser = get_browser();
    userEvent.date = new Date().toISOString();
    userEvent.eventName = event;
    userEvent.path = window.location.pathname;
    userEvent.userBrowserName = browser.name;
    userEvent.userBrowserVersion = browser.version;
    userEvent.userDeviceType = browser.device;
    userEvent.sessionId = object.id;

    let key = JSON.parse("" + localStorage.getItem("localKey"));
    userEvent.localClientAgent = key;

    let User1: User = new User(userEvent.userId);
    User1.date = userEvent.date;
    User1.eventName = userEvent.eventName;
    User1.path = userEvent.path;
    User1.userBrowserName = userEvent.userBrowserName;
    User1.userBrowserVersion = userEvent.userBrowserVersion;
    User1.userDeviceType = userEvent.userDeviceType;
    User1.sessionId = userEvent.sessionId;
    User1.localClientAgent = userEvent.localClientAgent;
    User1.eventTagsArray = userEvent.eventTagsArray;
    User1.customParams = userEvent.customParams;

    if (userEvents.length < 5) {
        userEvents.push(User1);
    }
    else {
        userEvents.push(User1);
        sendEvent();
        userEvents = [];
    }
    setInterval(() => {
        if (userEvents.length != 0) {
            sendEvent();
            userEvents = [];
        }

    }, 5000);
};

export async function sendUser(event: object) {
    await axios.post('/patient_user', event, {
        baseURL: admin.baseURL,
        headers: { Authorization: "bearer " + admin.token }
    })
}

export async function sendEvent() {
    await userEvents.map((event) => {
        axios.post('/event', event, {
            baseURL: admin.baseURL,
            headers: { Authorization: "bearer " + admin.token }
        })
    })
}


export default {
    initialize,
    track,
    identify
}


