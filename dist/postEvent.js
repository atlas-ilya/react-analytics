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
exports.sendEvent = exports.sendUser = void 0;
const axios_1 = require("axios");
const track_1 = require("./track");
function sendUser(event) {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.post('/patient_user', event, {
            baseURL: 'https://api.tsu-examples.sabir.pro/api',
            headers: { Authorization: "bearer " + track_1.admin.token }
        });
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
