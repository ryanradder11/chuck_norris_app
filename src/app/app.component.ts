import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Observable, of} from 'rxjs';
import {Joke} from './models/joke.model';
import {JokeService} from './services/joke.service';
import {AsyncPipe, NgForOf} from '@angular/common';

const DEFAULT_JOKE_COUNT = 10;
export const TITLE = 'chuck_norris_ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 public title = TITLE;
 public jokes$: Observable<Joke[]> = of([]);

  constructor(private jokeService: JokeService) {
    this.jokes$ = this.jokeService.getJokes(DEFAULT_JOKE_COUNT);
  }
}
