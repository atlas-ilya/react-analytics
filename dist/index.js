"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialize = exports.track = exports.identify = void 0;
var track_1 = require("./track");
Object.defineProperty(exports, "identify", { enumerable: true, get: function () { return track_1.identify; } });
Object.defineProperty(exports, "track", { enumerable: true, get: function () { return track_1.track; } });
var postEvent_1 = require("./postEvent");
Object.defineProperty(exports, "initialize", { enumerable: true, get: function () { return postEvent_1.initialize; } });
