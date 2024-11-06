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
exports.api = void 0;
const api = () => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve, reject) => setTimeout(resolve, 2000));
    return [
        { id: "1", name: "lola ji", work: "hilana" },
        { id: "2", name: "lola ji", work: "hilana" },
        { id: "3", name: " ji", work: "hilana" },
        { id: "4", name: " ji", work: "hilana" },
        { id: "5", name: " ji", work: "hilana" },
        { id: "6", name: " ji", work: "hilana" },
        { id: "7", name: "lola ji", work: "hilana" },
    ];
});
exports.api = api;
