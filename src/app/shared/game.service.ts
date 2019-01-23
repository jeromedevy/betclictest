import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs/Subject';
import { Player } from './player.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Game } from './game.model';
import { backOfficeWorldPlayers } from '../shared/worldPlayers';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class GameService {

  private currentGameSubject = new BehaviorSubject<any>(new Game("defaultUser", 0, 0, 50));
  private currentGame = this.currentGameSubject.asObservable();


  private worldPlayers: Player[] = [...backOfficeWorldPlayers].map(item => ({ ...item }));;
  playersSubject = new Subject<any[]>();

  constructor(private router: Router) { }


  signInUser(newPlayerName: string) {
    return new Promise((resolve, reject) => {
      if (this.checkPlayerNotAlreadyExists(newPlayerName)) {
        this.currentGameSubject.next(new Game(newPlayerName, 0, 0, 50));
        this.worldPlayers.push({ name: newPlayerName, rate: 50 });
        resolve();
      } else {
        reject("Sorry !! This name already exists...");
      }
    });
  }

  checkPlayerNotAlreadyExists(pPlayerName: string): boolean {
    const arrayOfPlayersHavingThisName = this.worldPlayers.filter(player => player.name === pPlayerName);
    return arrayOfPlayersHavingThisName.length > 0 ? false : true;
  }

  updateGame(pGame: Game) {
    return new Promise((resolve, reject) => {
      this.currentGameSubject.next(pGame);
      this.updateBackOfficeWorldPlayersList(pGame);
      resolve();
    }).catch((error) => {
      console.log(error);
      this.router.navigate(['player'])
    });
  }

  private updateBackOfficeWorldPlayersList(pGame: Game): void {
    const indice = this.getCurrentPlayerIndex(pGame.playerName);
    this.worldPlayers[indice].rate = pGame.rank;
  }

  getCurrentGame() {
    return this.currentGameSubject.asObservable();
  }

  getAllPlayers(): Array<any> {
    return this.worldPlayers;
  }

  private getCurrentPlayerIndex(tPlayerName): number {
    return this.worldPlayers.findIndex(tplayer => tplayer.name === tPlayerName);
  }
}
