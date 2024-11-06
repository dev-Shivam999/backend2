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
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const api_1 = require("./api");
const redis = new ioredis_1.default({
    host: 'localhost',
    port: 6379
});
redis.on("connect", () => console.log("redis connected"));
redis.on("error", () => console.log("not connect"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let re = yield redis.get("product");
    if (re) {
        re = JSON.parse(re);
        return res.json(re);
    }
    let data = yield (0, api_1.api)();
    redis.set("product", JSON.stringify(data));
    return res.json(data);
}));
app.get('/remove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = `product:{id:${1}}`;
    let obe = yield redis.del(key);
    console.log(obe);
    let re = yield redis.get("product");
    re = JSON.parse(re ? re : "");
    res.json(re);
}));
app.listen(8080, () => {
    console.log("app listening on port 8080");
});
