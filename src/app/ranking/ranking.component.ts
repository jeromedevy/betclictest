import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  players: any[];
  playersSubscription: Subscription;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.playersSubscription = this.gameService.playersSubject.subscribe(
      (players: any[]) => {
        this.players = players;
      }
    );
    this.gameService.emitAllPlayers();
  }

  ngOnDestroy() {
    this.playersSubscription.unsubscribe();
  }

}
