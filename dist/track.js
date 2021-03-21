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
exports.sendEvent = exports.sendUser = exports.track = exports.identify = exports.initialize = exports.userParams = exports.userEvent = exports.userEvents = exports.admin = exports.User = exports.Admin = void 0;
const fingerprintjs_1 = require("@fingerprintjs/fingerprintjs");
const getBrowser_1 = require("./getBrowser");
const axios_1 = require("axios");
class Admin {
    constructor(token) {
        this.token = token;
    }
}
exports.Admin = Admin;
class User {
    constructor(userId) {
        this.eventName = '';
        this.customParams = {};
        this.eventTagsArray = '';
        this.path = '';
        this.date = '';
        this.userBrowserName = '';
        this.userBrowserVersion = '';
        this.userDeviceType = '';
        this.sessionId = '';
        this.localClientAgent = '';
        this.userId = userId;
    }
}
exports.User = User;
function initialize(token) {
    exports.admin = new Admin(token);
    exports.userEvents = [];
}
exports.initialize = initialize;
function identify(user) {
    if (!exports.admin.token) {
        console.error('Call function initialize');
        return;
    }
    exports.userEvent = new User(user.objectId);
    exports.userParams = {
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
    sendUser(exports.userParams);
    (() => __awaiter(this, void 0, void 0, function* () {
        const fp = yield fingerprintjs_1.default.load();
        const result = yield fp.get();
        return result.visitorId;
    }))().then((visitorId) => localStorage.setItem("localKey", JSON.stringify(visitorId)));
}
exports.identify = identify;
;
function track(event, options, eventTagsArray) {
    if (!exports.userEvent) {
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
        exports.userEvent.customParams = JSON.stringify(options);
    }
    else
        exports.userEvent.customParams = JSON.stringify({});
    if (eventTagsArray) {
        exports.userEvent.eventTagsArray = JSON.stringify(eventTagsArray);
    }
    else
        exports.userEvent.eventTagsArray = JSON.stringify([]);
    const browser = getBrowser_1.get_browser();
    exports.userEvent.date = new Date().toISOString();
    exports.userEvent.eventName = event;
    exports.userEvent.path = window.location.pathname;
    exports.userEvent.userBrowserName = browser.name;
    exports.userEvent.userBrowserVersion = browser.version;
    exports.userEvent.userDeviceType = browser.device;
    exports.userEvent.sessionId = object.id;
    let key = JSON.parse("" + localStorage.getItem("localKey"));
    exports.userEvent.localClientAgent = key;
    if (exports.userEvents.length < 5) {
        let User1 = new User(exports.userEvent.userId);
        User1.date = exports.userEvent.date;
        User1.eventName = exports.userEvent.eventName;
        User1.path = exports.userEvent.path;
        User1.userBrowserName = exports.userEvent.userBrowserName;
        User1.userBrowserVersion = exports.userEvent.userBrowserVersion;
        User1.userDeviceType = exports.userEvent.userDeviceType;
        User1.sessionId = exports.userEvent.sessionId;
        User1.localClientAgent = exports.userEvent.localClientAgent;
        User1.eventTagsArray = exports.userEvent.eventTagsArray;
        User1.customParams = exports.userEvent.customParams;
        exports.userEvents.push(User1);
    }
    else {
        sendEvent();
        exports.userEvents = [];
    }
    setInterval(() => {
        if (exports.userEvents.length != 0) {
            sendEvent();
            exports.userEvents = [];
        }
    }, 5000);
}
exports.track = track;
;
function sendUser(event) {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.post('/patient_user', event, {
            baseURL: 'https://api.tsu-examples.sabir.pro/api',
            headers: { Authorization: "bearer " + exports.admin.token }
        });
    });
}
exports.sendUser = sendUser;
function sendEvent() {
    exports.userEvents.map((event) => {
        axios_1.default.post('/event', event, {
            baseURL: 'https://api.tsu-examples.sabir.pro/api',
            headers: { Authorization: "bearer " + exports.admin.token }
        });
    });
}
exports.sendEvent = sendEvent;
exports.default = {
    initialize,
    track,
    identify
};
