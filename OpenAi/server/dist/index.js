"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const open_1 = require("./open");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const user = [{ name: 'John', email: 'sinch@gmail.com' }, { name: "alice", email: "alice@gmail.com" }];
app.get('/user', (req, res) => {
    const { name } = req.query;
    if (typeof name == "string") {
        const re = user.filter(p => p.name.toLowerCase().trim().includes(name.toLowerCase()));
        res.json({ re });
    }
});
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(open_1.opne));
app.listen(3000, () => {
    console.log("server listening on 3000");
});
