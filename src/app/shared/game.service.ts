import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Game } from './game.model';
import { Router } from '@angular/router';
import { BackendService } from './backend.service';


@Injectable({
  providedIn: 'root'
})

export class GameService {

  private currentGameSubject = new BehaviorSubject<any>(new Game("defaultUser", 0, 0, 50));
  private currentGame = this.currentGameSubject.asObservable();

  constructor(private router: Router, private backendService: BackendService) { }

  signInUser(newPlayerName: string) {
    return new Promise((resolve, reject) => {
      if (this.checkPlayerNotAlreadyExists(newPlayerName)) {
        this.currentGameSubject.next(new Game(newPlayerName, 0, 0, 50));
        this.backendService.addPlayer({ name: newPlayerName, rate: 50 });
        resolve();
      } else {
        reject("Sorry !! This name already exists...");
      }
    });
  }

  checkPlayerNotAlreadyExists(pPlayerName: string): boolean {
    const arrayOfPlayersHavingThisName = this.backendService.getPlayers().filter(player => player.name === pPlayerName);
    return arrayOfPlayersHavingThisName.length > 0 ? false : true;
  }

  updateGame(pGame: Game) {
    return new Promise((resolve, reject) => {
      this.currentGameSubject.next(pGame);
      this.backendService.updatePlayers(pGame.playerName, pGame.rank);
      resolve();
    }).catch((error) => {
      console.log(error);
      this.router.navigate(['player'])
    });
  }

  getCurrentGame() {
    return this.currentGameSubject.asObservable();
  }
}
