"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEvent = exports.sendUser = void 0;
const axios_1 = require("axios");
const track_1 = require("./track");
function sendUser(event) {
    axios_1.default.post('/patient_user', event, {
        baseURL: 'https://api.tsu-examples.sabir.pro/api',
        headers: { Authorization: "bearer " + track_1.admin.token }
    });
}
exports.sendUser = sendUser;
function sendEvent(events) {
    events.map((event) => {
        axios_1.default.post('/event', event, {
            baseURL: 'https://api.tsu-examples.sabir.pro/api',
            headers: { Authorization: "bearer " + track_1.admin.token }
        });
    });
}
exports.sendEvent = sendEvent;
