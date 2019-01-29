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

export class PlayerComponent implements OnInit {
  name = new FormControl('');
  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private gameService: GameService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  onContinue() {
    const playerEntered = this.signUpForm.get('name').value;
    this.gameService.signInUser(playerEntered).then(
      () => {
        this.router.navigate(['game']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )
  }

}
