import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs/Subject';
import { Player } from './player.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private tempSubject = new BehaviorSubject<any>(new Game("defaultUser", 0, 0, 0));
  tempCurrentGame = this.tempSubject.asObservable();


  private worldPlayers = [
    {
      id: 1,
      name: 'Dark Vador',
      rate: 51
    },
    {
      id: 2,
      name: 'Frigo',
      rate: 47
    },
    {
      id: 3,
      name: 'Barbarella',
      rate: 62
    }
  ];

  playersSubject = new Subject<any[]>();

  constructor() { }

  emitAllPlayers() {
    this.playersSubject.next(this.worldPlayers.slice());
  }

  updateGame(pGame: Game) {
    this.tempSubject.next(pGame);
  }

  getTCurrentGame() {
    return this.tempCurrentGame;
  }

}
