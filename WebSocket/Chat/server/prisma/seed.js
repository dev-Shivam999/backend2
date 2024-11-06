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
const client_1 = require("@prisma/client");
const PClient = new client_1.PrismaClient();
function AddUser() {
    return __awaiter(this, void 0, void 0, function* () {
        yield PClient.user.upsert({
            where: {
                id: 1
            },
            update: {},
            create: {
                name: "lol"
            }
        });
        yield PClient.user.upsert({
            where: {
                id: 2
            },
            update: {},
            create: {
                name: "lol2"
            }
        });
        yield PClient.user.upsert({
            where: {
                id: 3
            },
            update: {},
            create: {
                name: "lol3"
            }
        });
    });
}
AddUser().then(() => __awaiter(void 0, void 0, void 0, function* () { return yield PClient.$disconnect(); })).catch(() => __awaiter(void 0, void 0, void 0, function* () { return yield PClient.$disconnect(); }));
