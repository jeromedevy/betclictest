import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  player : string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.player = this.route.snapshot.paramMap.get('name');
    console.log("the player : " + this.player);
  }

  restartNewGame() {
    this.router.navigate(['/player']);
  }

}
