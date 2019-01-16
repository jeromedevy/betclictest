export class Game {
    playerName: string;
    playerScore: number;
    computerScore: number;
    rank: number;

    constructor(playerName: string, playerScore: number, computerScore: number, rank: number) {
        this.playerName = playerName;
        this.playerScore = playerScore;
        this.computerScore = computerScore;
        this.rank = rank;
    }

    getPlayerName(): string {
        return this.playerName;
    }
}