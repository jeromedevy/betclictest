import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Player } from '../shared/player.model';
import { BackendService } from '../shared/backend.service';
import { Game } from '../shared/game.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit, OnDestroy {

  players: Player[];
  listPlayers: MatTableDataSource<Player>;
  displayedColumns: string[] = ['name', 'rate'];

  currentGame: Game;
  gameSubscription: Subscription;
  playersSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private gameService: GameService, private backendService: BackendService) { }

  ngOnInit() {
    this.gameSubscription = this.gameService.getCurrentGame().subscribe(
      (game: any) => {
        this.currentGame = game;
      }
    );
    let responsePlayers;
    this.playersSubscription = this.backendService.getPlayers().subscribe(res => {
      responsePlayers = res;
    });


    this.listPlayers = new MatTableDataSource(responsePlayers);
//    this.listPlayers = new MatTableDataSource(this.backendService.getPlayers());
    this.listPlayers.sort = this.sort;
    this.listPlayers.paginator = this.paginator;

    this.listPlayers.connect().subscribe(d => this.players = d);
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
    this.playersSubscription.unsubscribe();
  }

}
