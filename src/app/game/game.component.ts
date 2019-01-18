import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameObject } from '../shared/gameObject.model';
import { timeout } from 'q';
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

  tCurrentGame: Game;
  tGameSubscription: Subscription;

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
    this.initializeShoot();

    this.tGameSubscription = this.gameService.currentGame.subscribe(
      (game: any) => {
        this.tCurrentGame = game;
      }
    );
  }

  ngOnDestroy() {
    this.tGameSubscription.unsubscribe();
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

    this.tCurrentGame.rank = this.computeRank();
    this.gameService.updateGame(this.tCurrentGame);
  }

  private computeRank(): number {
    let num : number = this.tCurrentGame.playerScore;
    let denom = this.tCurrentGame.playerScore + this.tCurrentGame.computerScore;
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
      this.tCurrentGame.playerScore++;
    }

    if ((computerChoice == "scissors" && selectedObject == "paper") ||
      (computerChoice == "paper" && selectedObject == "rock") ||
      (computerChoice == "rock" && selectedObject == "scissors")) {
      this.tCurrentGame.computerScore++;
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
