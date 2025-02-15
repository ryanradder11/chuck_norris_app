import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Joke } from './store/jokes.state';
import { selectJokes, selectTimerActive } from './store/jokes.selectors';
import { Store } from '@ngrx/store';
import { loadJokes, toggleTimer, toggleFavorite } from './store/jokes.actions';

const DEFAULT_JOKE_COUNT = 10;
export const TITLE = 'chuck_norris_ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = TITLE;
  jokes$: Observable<Joke[]> = of([]);
  timerActive$: Observable<boolean> = this.store.select(selectTimerActive);

  constructor(private store: Store) {
    this.store.dispatch(loadJokes());
    this.jokes$ = this.store.select(selectJokes);
  }

  toggleTimer() {
    this.store.dispatch(toggleTimer());
  }

  toggleFavorite(id: string) {
    this.store.dispatch(toggleFavorite({ id }));
  }
}
