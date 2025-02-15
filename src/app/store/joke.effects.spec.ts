import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JokeService } from '../services/joke.service';
import {JokesEffects} from './jokes.effects';

describe('JokeEffects', () => {
  let actions$: Observable<any>;
  let effects: JokesEffects;

  beforeEach(() => {
    actions$ = new Observable();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JokesEffects,
        JokeService,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(JokesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
