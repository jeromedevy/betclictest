import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Player } from '../shared/player.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  players: Player[];
  listPlayers: MatTableDataSource<Player>;
  displayedColumns: string[] = ['name', 'rate'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private gameService: GameService) { }


  ngOnInit() {
    // this.playersSubscription = this.gameService.playersSubject.subscribe(
    //   (players: Player[]) => {
    //     this.players = players;
    //     this.listPlayers = new MatTableDataSource(array);
    //     this.listPlayers.sort = this.sort;
    //     this.listPlayers.paginator = this.paginator;
    //   }
    // );
    // this.gameService.emitAllPlayers();

    this.listPlayers = new MatTableDataSource(this.gameService.getAllPlayers());
    this.listPlayers.sort = this.sort;
    this.listPlayers.paginator = this.paginator;

    this.listPlayers.connect().subscribe(d => this.players = d);
    console.log(" rank : " + this.players.length);

  }

}
