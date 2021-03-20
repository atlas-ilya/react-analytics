"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.track = exports.identify = exports.initialize = exports.admin = exports.Admin = void 0;
const fingerprintjs_1 = require("@fingerprintjs/fingerprintjs");
const postEvent_1 = require("./postEvent");
const user_1 = require("./user");
const getBrowser_1 = require("./getBrowser");
let userEvents = [];
let userEvent;
let userParams;
class Admin {
    constructor(token) {
        this.token = token;
    }
}
exports.Admin = Admin;
function initialize(token) {
    exports.admin = new Admin(token);
}
exports.initialize = initialize;
function identify(user) {
    if (!exports.admin.token) {
        console.error('Call function initialize');
        return;
    }
    userEvent = new user_1.User();
    userEvent.userId = user.objectId;
    userParams = {
        id: user.objectId,
        email: user.email,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName,
        tags: JSON.stringify(user.tags),
        userRole: user.userRole,
    };
    const object = { id: "" + Math.random().toString(36).substr(2, 9), timestamp: new Date().getTime() };
    localStorage.setItem("SessionId", JSON.stringify(object));
    postEvent_1.sendUser(userParams);
    (() => __awaiter(this, void 0, void 0, function* () {
        const fp = yield fingerprintjs_1.default.load();
        const result = yield fp.get();
        return result.visitorId;
    }))().then((visitorId) => localStorage.setItem("localKey", JSON.stringify(visitorId)));
}
exports.identify = identify;
;
function track(event, options, eventTagsArray) {
    if (!userEvent) {
        console.error('You need to identify the user, ' +
            'use function widget.identify(user)');
        return;
    }
    let object = JSON.parse("" + localStorage.getItem("SessionId"));
    if (object.timestamp <= new Date().getTime() - 18000000) {
        const newObj = { id: "" + Math.random().toString(36).substr(2, 8), timestamp: new Date().getTime() };
        localStorage.setItem("SessionId", JSON.stringify(newObj));
        object = newObj;
    }
    if (options) {
        userEvent.customParams = JSON.stringify(options);
    }
    else
        userEvent.customParams = JSON.stringify({});
    if (eventTagsArray) {
        userEvent.eventTagsArray = JSON.stringify(eventTagsArray);
    }
    else
        userEvent.eventTagsArray = JSON.stringify([]);
    const browser = getBrowser_1.get_browser();
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
        postEvent_1.sendEvent(userEvents);
        userEvents = [];
    }
    setInterval(() => {
        if (userEvents.length != 0) {
            postEvent_1.sendEvent(userEvents);
            userEvents = [];
        }
    }, 5000);
}
exports.track = track;
;
exports.default = {
    initialize,
    track,
    identify
};
