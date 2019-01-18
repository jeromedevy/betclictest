import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs/Subject';
import { Player } from './player.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Game } from './game.model';
//import { worldPlayers } from '../shared/worldPlayers';


@Injectable({
  providedIn: 'root'
})

export class GameService {

  private currentGameSubject = new BehaviorSubject<any>(new Game("defaultUser", 0, 0, 50));
  currentGame = this.currentGameSubject.asObservable();


  private tWorldPlayers: Player[] = [...worldPlayers].map(item => ({ ...item })); ;
  playersSubject = new Subject<any[]>();

  constructor() {}

  // emitAllPlayers() {
  //   this.playersSubject.next(this.worldPlayers.slice());
  // }

  updateGame(pGame: Game) {
    this.currentGameSubject.next(pGame);

  }

  initGame() {
    this.currentGameSubject.next(new Game("defaultUser", 0, 0, 50));
    console.log(" avant : " + this.tWorldPlayers.length);
    //let tplayer = new Player(14, "toto", 59);
   // let tplayer : Player[] = [new Player(14, "toto", 59)];
    this.tWorldPlayers.push({ id: 14, name: 'toto', rate: 64});
    console.log(" après : " + this.tWorldPlayers.length);
  }

  getTCurrentGame() {
    return this.currentGame;
  }

  getAllPlayers(): Array<any> {
    console.log(" aprdès : " + this.tWorldPlayers.length);
    const tArray = this.tWorldPlayers.filter(tplayer => tplayer.name != "Frigo");
    return tArray;
  }

}

export let worldPlayers : Array<Player> = [
  { id: 1, name: 'Dark Vador', rate: 52},
  { id: 2, name: 'Frigo', rate: 56},
  { id: 3, name: 'jobby33', rate: 31},
  { id: 4, name: 'MissMapple', rate: 59},
  { id: 5, name: 'Joe Wilfried Tsonga', rate: 48},
  { id: 6, name: 'Ali banko', rate: 52},
  { id: 7, name: 'xlkjfmebg', rate: 60},
  { id: 8, name: 'sAnta bArbara', rate: 41},
  { id: 9, name: '-((:-/)', rate: 46},
  { id: 10, name: 'Albator', rate: 50},
  { id: 11, name: 'Mayala Beye', rate: 54},
  { id: 12, name: 'Frigo', rate: 43},
  { id: 13, name: 'Barbarella', rate: 64}
];