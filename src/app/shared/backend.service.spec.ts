import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BackendService } from './backend.service';

describe('BackendService', () => {
    let backendService: BackendService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [BackendService]
        });

        backendService = TestBed.get(BackendService);
    });

    it('should be created', () => {
        expect(backendService).toBeTruthy();
    });

    // Add tests for getPlayers() method
    describe('getPlayers', () => {
        it('should return a collection of players', () => {
            const playersResponse = [
                { id: 1, name: 'Dark Vador', rate: 51 },
                { id: 2, name: 'Frigo', rate: 56 },
                { id: 3, name: 'jobby33', rate: 31 }
            ];
               
            let response;
            spyOn(backendService, 'getPlayers').and.returnValue(of(playersResponse));
      
            backendService.getPlayers().subscribe(res => {
              response = res;
            });

            expect(response).toEqual(playersResponse);
        });
    });



});
