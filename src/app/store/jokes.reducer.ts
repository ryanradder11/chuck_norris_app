import { createReducer, on } from '@ngrx/store';
import * as JokeActions from './jokes.actions';
import { initialState, JokesState } from './jokes.state';

export const jokesReducer = createReducer(
  initialState,
  on(JokeActions.jokesLoaded, (state, { jokes }) => ({ ...state, jokes })),

  on(JokeActions.addJoke, (state, { joke }) => {
    const updatedJokes = [joke, ...state.jokes].slice(0, 10);
    return { ...state, jokes: updatedJokes };
  }),

  on(JokeActions.toggleTimer, (state) => ({ ...state, timerActive: !state.timerActive })),

  on(JokeActions.toggleFavorite, (state, { id }) => {
    const jokeToToggle = state.jokes.find(j => j.id === id);
    if (!jokeToToggle) return state;
    const updatedJokes = state.jokes.map(j => j.id === id ? { ...j, isFavorite: !j.isFavorite } : j);
    const updatedFavorites = updatedJokes.filter(j => j.isFavorite).slice(0, 10);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return { ...state, jokes: updatedJokes, favorites: updatedFavorites };
  }),

  on(JokeActions.removeFavorite, (state, { id }) => {
    const updatedFavorites = state.favorites.filter(j => j.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return { ...state, favorites: updatedFavorites };
  })
);
