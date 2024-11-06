"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFn = void 0;
const store_1 = require("./store");
function LoggerFn() {
    setInterval(() => {
        console.log(store_1.GameManager.getInstance().getGame());
    }, 5000);
}
exports.LoggerFn = LoggerFn;
