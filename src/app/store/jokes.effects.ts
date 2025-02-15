import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { catchError, map, mergeMap, switchMap, takeUntil } from 'rxjs/operators';
import * as JokeActions from './jokes.actions';
import { JokeService } from '../services/joke.service';

@Injectable()
export class JokesEffects {
  constructor(private actions$: Actions, private jokeService: JokeService) {}

  loadJokes$ = createEffect(() =>

    this.actions$.pipe(
      ofType(JokeActions.loadJokes),
      mergeMap(() =>
        this.jokeService.getJokes(10).pipe(
          map(jokes => JokeActions.jokesLoaded({ jokes })),
          catchError(() => of({ type: '[Jokes] Load Failed' }))
        )
      )
    )
  );

  timerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JokeActions.toggleTimer),
      switchMap(() =>
        timer(0, 5000).pipe(
          mergeMap(() => this.jokeService.getJokes(1)),
          map(jokes => JokeActions.addJoke({ joke: jokes[0] })),
          takeUntil(this.actions$.pipe(ofType(JokeActions.toggleTimer)))
        )
      )
    )
  );
}
