import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'q';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  player: string;
  initList =  [{ url: "./assets/img/scissors_64.png", name: "scissors", show: true }, { url: "./assets/img/paper_64.png", name: "paper", show: true }, { url: "./assets/img/rock_64.png", name: "rock", show: true }];
  imagesList = [];
  computerChoice: object;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.player = this.route.snapshot.paramMap.get('name');
    this.imagesList =  [ ...this.initList ].map(item=>({...item}));
    this.computerChoice = {url: "#", name: "", show: false};
    console.log("the player : " + this.player);
  }

  restartNewGame() {
    this.router.navigate(['/player']);
  }

  async selectObject(selectedObject) {
    this.computerChoice = this.initList[this.randomIntInc(0,2)];
    console.log("select : " + selectedObject);
    this.imagesList.forEach(image => {
      if (image.name != selectedObject) {
        image.show = false;
      }
    });
    await this.delay(1500)
    this.ngOnInit();

  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low)
  }
}
