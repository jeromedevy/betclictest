import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GameObject } from '../shared/gameObject.model';
import { images } from '../shared/gameImages';
import { GameService } from '../shared/game.service';
import { Game } from '../shared/game.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit, OnDestroy {

  imagesList = [];
  computerChoice: GameObject;

  currentGame: Game;
  gameSubscription: Subscription;

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
    this.initializeShoot();

    this.gameSubscription = this.gameService.getCurrentGame().subscribe(
      (game: any) => {
        this.currentGame = game;
      }
    );
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }

  restartNewGame() {
    this.router.navigate(['/player']);
  }

  async selectObject(selectedObject) {
    this.computerChoice = this.runComputerChoice();
    this.showOnlyPlayerChoice(selectedObject);
    await this.delay(1500);

    this.computeScore(selectedObject, this.computerChoice.name);
    this.initializeShoot();

    this.currentGame.rank = this.computeRank();
    this.gameService.updateGame(this.currentGame);
  }

  private computeRank(): number {
    let num : number = this.currentGame.playerScore;
    let denom = this.currentGame.playerScore + this.currentGame.computerScore;
    return  denom > 0 ? Math.round((num/denom) * 100) : 50;
  }

  private showOnlyPlayerChoice(selectedObject: string) {
    this.imagesList.forEach(image => {
      if (image.name != selectedObject) {
        image.show = false;
      }
    });
  }

  private initializeShoot() {
    this.imagesList = [...images].map(item => ({ ...item }));
    this.computerChoice = { url: "#", name: "", show: false };
  }

  private computeScore(selectedObject: string, computerChoice: string) {
    if ((selectedObject == "scissors" && computerChoice == "paper") ||
      (selectedObject == "paper" && computerChoice == "rock") ||
      (selectedObject == "rock" && computerChoice == "scissors")) {
      this.currentGame.playerScore++;
    }

    if ((computerChoice == "scissors" && selectedObject == "paper") ||
      (computerChoice == "paper" && selectedObject == "rock") ||
      (computerChoice == "rock" && selectedObject == "scissors")) {
      this.currentGame.computerScore++;
    }
  }

  private runComputerChoice() {
    return images[this.randomIntInc(0, 2)];
  }

  private randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low)
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
