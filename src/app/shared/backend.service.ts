import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { backOfficeWorldPlayers } from '../shared/worldPlayers';

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  private worldPlayers: Player[];

  constructor() { 
    this.worldPlayers = [...backOfficeWorldPlayers].map(item => ({ ...item }));
  }


  getPlayers(): Player[] {
    return this.worldPlayers;
  }

  addPlayer(player: Player) {
    console.log("-- addPlayer: " + player.name);
    this.worldPlayers.push({ name: player.name, rate: player.rate });
  }

  updatePlayers(playerName: string, rank: number): void {
    const indice = this.getCurrentPlayerIndex(playerName);
    this.worldPlayers[indice].rate = rank;
  }

  private getCurrentPlayerIndex(tPlayerName): number {
    return this.worldPlayers.findIndex(tplayer => tplayer.name === tPlayerName);
  }

}
