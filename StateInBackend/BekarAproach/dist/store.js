"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.game = exports.GameManager = exports.Fun = void 0;
exports.Fun = [];
class GameManager {
    constructor() {
        this.Game = [];
        this.Game = [];
    }
    static getInstance() {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = new GameManager();
        return GameManager.instance;
    }
    AddGame(game) {
        this.Game.push(game);
    }
    getGame() {
        return this.Game;
    }
    AddMoves(id, moves) {
        const move = this.Game.find(p => p.id = id);
        move === null || move === void 0 ? void 0 : move.moves.push(moves);
    }
}
exports.GameManager = GameManager;
exports.game = GameManager.getInstance();
