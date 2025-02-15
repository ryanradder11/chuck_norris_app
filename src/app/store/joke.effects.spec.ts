import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JokeService } from '../services/joke.service';
import { JokesEffects } from './jokes.effects';
import * as JokeActions from './jokes.actions';
import { provideMockStore } from '@ngrx/store/testing';

describe('JokesEffects', () => {
  let actions$: Observable<any>;
  let effects: JokesEffects;
  let jokeService: jasmine.SpyObj<JokeService>;

  beforeEach(() => {
    const jokeServiceSpy = jasmine.createSpyObj('JokeService', ['getJokes']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JokesEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: JokeService, useValue: jokeServiceSpy }
      ]
    });

    effects = TestBed.inject(JokesEffects);
    jokeService = TestBed.inject(JokeService) as jasmine.SpyObj<JokeService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadJokes$', () => {
    it('should return jokesLoaded action on success', (done) => {
      const jokes = [{ id: '1', value: 'Test Joke', icon_url: '', url: '', isFavorite: false }];
      const action = JokeActions.loadJokes();
      const outcome = JokeActions.jokesLoaded({ jokes });

      actions$ = of(action);
      jokeService.getJokes.and.returnValue(of(jokes));

      effects.loadJokes$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });

    it('should return load failed action on failure', (done) => {
      const action = JokeActions.loadJokes();
      const outcome = { type: '[Jokes] Load Failed' };

      actions$ = of(action);
      jokeService.getJokes.and.returnValue(throwError('Error'));

      effects.loadJokes$.subscribe(result => {
        expect(result).toEqual(outcome);
        done();
      });
    });
  });

});
