"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEvent = exports.sendUser = exports.initialize = exports.admin = exports.Admin = void 0;
const axios_1 = require("axios");
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
function sendUser(event) {
    axios_1.default.post('/patient_user', event, {
        baseURL: 'https://api.tsu-examples.sabir.pro/api',
        headers: { Authorization: "bearer " + exports.admin.token }
    });
}
exports.sendUser = sendUser;
function sendEvent(events) {
    events.map((event) => {
        axios_1.default.post('/event', event, {
            baseURL: 'https://api.tsu-examples.sabir.pro/api',
            headers: { Authorization: "bearer " + exports.admin.token }
        });
    });
}
exports.sendEvent = sendEvent;
