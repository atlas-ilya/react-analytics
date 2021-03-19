import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { sendEvent, sendUser, initialize, admin } from './postEvent'
import {User} from './user'
import { get_browser } from './getBrowser'


let userEvents: User[] = [];
let userEvent: any;
let userParams: any;


function identify(user: any): void {
    if (!admin.token) {
        console.error('Call function initialize');
        return;
    }
    userEvent = new User();
    userEvent.userId = user.objectId;
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

    (async () => {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId;
    })().then((visitorId) => localStorage.setItem("localKey", JSON.stringify(visitorId)));
    sendUser(userParams);
};


function track(event: string, options?: object, eventTagsArray?: string[]): void {
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



    if (userEvents.length < 4) {
        userEvents.push(userEvent);
    }
    else {
        userEvents.push(userEvent);
        sendEvent(userEvents);
        userEvents = [];
    }
    setInterval(() => {
        if (userEvents.length != 0) {
            sendEvent(userEvents);
            userEvents = [];
        }

    }, 5000);
};




export default {
    initialize,
    track,
    identify
}


