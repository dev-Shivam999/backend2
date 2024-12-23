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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const express_1 = __importDefault(require("express"));
const __1 = require("..");
exports.route = express_1.default.Router();
exports.route.post("/Login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body;
    console.log(id);
    res.json("lol");
}));
exports.route.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield __1.PClient.user.findMany({});
    res.json({ user: user });
}));
