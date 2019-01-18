import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameService } from '../shared/game.service';
import { Game } from '../shared/game.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  name = new FormControl('');
  signUpForm: FormGroup;
  tCurrentGame: Game;
  tGameSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private gameService: GameService) { }

  ngOnInit() {
    this.initForm();

    this.gameService.initGame();
    this.tGameSubscription = this.gameService.currentGame.subscribe(
      (game: any) => {
        this.tCurrentGame = game;
      }
    );
  }

  ngOnDestroy() {
    this.tGameSubscription.unsubscribe();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  onPlay() {
    this.tCurrentGame.playerName = this.signUpForm.get('name').value;
    this.gameService.updateGame(this.tCurrentGame);
    this.router.navigate(['game']);
  }

}
