

import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { sendEvent, sendUser, initialize} from './postEvent'
import {User} from './user'
import { get_browser } from './getBrowser'
import Index from "./globals"





function identify(user: any): void {
    if (!Index.admin.token) {
        console.error('Call function initialize');
        return;
    }
    Index.userEvent = new User();
    Index.userEvent.userId = user.objectId;
    Index.userParams = {
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
    sendUser(Index.userParams);
};


function track(event: string, options?: object, eventTagsArray?: string[]): void {
    if (!Index.userEvent) {
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
        Index.userEvent.customParams = JSON.stringify(options);
    } else Index.userEvent.customParams = JSON.stringify({});

    if (eventTagsArray) {
        Index.userEvent.eventTagsArray = JSON.stringify(eventTagsArray);
    } else Index.userEvent.eventTagsArray = JSON.stringify([]);

    const browser = get_browser();
    Index.userEvent.date = new Date().toISOString();
    Index.userEvent.eventName = event;
    Index.userEvent.path = window.location.pathname;
    Index.userEvent.userBrowserName = browser.name;
    Index.userEvent.userBrowserVersion = browser.version;
    Index.userEvent.userDeviceType = browser.device;
    Index.userEvent.sessionId = object.id;

    let key = JSON.parse("" + localStorage.getItem("localKey"));
    Index.userEvent.localClientAgent = key;



    if (Index.userEvents.length < 4) {
        Index.userEvents.push(Index.userEvent);
    }
    else {
        Index.userEvents.push(Index.userEvent);
        sendEvent(Index.userEvents);
        Index.userEvents = [];
    }
    setInterval(() => {
        if (Index.userEvents.length != 0) {
            sendEvent(Index.userEvents);
            Index.userEvents = [];
        }

    }, 5000);
};




export default {
    initialize,
    track,
    identify
}


