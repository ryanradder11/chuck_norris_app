export interface Joke {
  id: string;
  value: string;
  icon_url: string;
  url: string;
  isFavorite: boolean;
}

export interface JokesState {
  jokes: Joke[];
  favorites: Joke[];
  timerActive: boolean;
}

export const initialState: JokesState = {
  jokes: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  timerActive: false,
};
