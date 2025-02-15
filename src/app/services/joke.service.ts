import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, forkJoin, of, delay} from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import {Joke} from '../store/jokes.state';

const URL = 'https://api.chucknorris.io/jokes/random';
const DELAY = 50;

@Injectable({ providedIn: 'root' })
export class JokeService {

  constructor(private http: HttpClient) {}

  public getJokes(count: number): Observable<Joke[]> {
    if(isNaN(count) || count < 1) {
      throw new Error('Invalid count');
    }

    const requests = Array.from({ length: count }, (_, i) =>
      of(null).pipe(
        delay(i * DELAY),
        concatMap(() => this.http.get<Joke>(URL))
      )
    );
    return forkJoin(requests).pipe(
      map(jokes => jokes.map(joke => ({ ...joke, isFavorite: false })))
    );
  }
}
