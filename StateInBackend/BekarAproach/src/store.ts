interface Game {
    id: string,
    WhilePlayer: string,
    BlackPlayer: string,
    moves: string[]
}

export const Fun: Game[] = []


export class GameManager {
    private Game: Game[] = []
    private static instance: GameManager
    private constructor() {
        this.Game = []
    }

    static getInstance() {
        if (GameManager.instance) {
            return GameManager.instance

        }
        
        GameManager.instance = new GameManager()
        return GameManager.instance

    }
    public AddGame(game: Game) {
        this.Game.push(game)
    }
    public getGame() {
        return this.Game
    }
    public AddMoves(id: string, moves: string) {
        const move = this.Game.find(p => p.id = id)
        move?.moves.push(moves)
    }

}


export const game = GameManager.getInstance();