import { createFeatureSelector, createSelector } from '@ngrx/store';
import { JokesState } from './jokes.state';

const selectJokesState = createFeatureSelector<JokesState>('jokes');

export const selectJokes = createSelector(selectJokesState, state => state.jokes);
export const selectFavorites = createSelector(selectJokesState, state => state.favorites);
export const selectTimerActive = createSelector(selectJokesState, state => state.timerActive);
