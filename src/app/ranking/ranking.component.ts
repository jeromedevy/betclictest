import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GameService } from '../shared/game.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Player } from '../shared/player.model';
import { BackendService } from '../shared/backend.service';

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

  constructor(private gameService: GameService, private backendService: BackendService) { }

  ngOnInit() {
    this.listPlayers = new MatTableDataSource(this.backendService.getPlayers());
    this.listPlayers.sort = this.sort;
    this.listPlayers.paginator = this.paginator;

    this.listPlayers.connect().subscribe(d => this.players = d);
  }

}
