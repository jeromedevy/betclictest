import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { GameService } from './game.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('GameService', () => {
    let gameService: GameService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GameService],
            imports: [ RouterTestingModule ]
        });

        gameService = TestBed.get(GameService);
    });

    it('should be created', () => {
        expect(gameService).toBeTruthy();
    });

    // Add tests for getCurrentGame() method
    describe('getCurrentGame', () => {
        it('should return the current game', () => {
            const currentGameResponse = [
                { playerName: "Mr Tea", playerScore: 12, computerScore: 14, rank: 40 },
                { playerName: "bronsky", playerScore: 15, computerScore: 15, rank: 50 },
                { playerName: "catwoman", playerScore: 12, computerScore: 14, rank: 40 }
            ];
            
            let response;
            spyOn(gameService, 'getCurrentGame').and.returnValue(of(currentGameResponse));
      
            gameService.getCurrentGame().subscribe(res => {
              response = res;
            });

            expect(response).toEqual(currentGameResponse);
        });
    });
});
