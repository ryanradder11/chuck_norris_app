import { createAction, props } from '@ngrx/store';
import {Joke} from './jokes.state';

export const loadJokes = createAction('[Jokes] Load Jokes');
export const jokesLoaded = createAction('[Jokes] Jokes Loaded', props<{ jokes: Joke[] }>());
export const addJoke = createAction('[Jokes] Add Joke', props<{ joke: Joke }>());
export const toggleTimer = createAction('[Jokes] Toggle Timer');
export const toggleFavorite = createAction('[Jokes] Toggle Favorite', props<{ id: string }>());
export const removeFavorite = createAction('[Jokes] Remove Favorite', props<{ id: string }>());
