import { ActionReducerMap } from '@ngrx/store';

import { IMoviesState, initialMoviesStateState, moviesReducer } from '@store/reducers/movies.reducer';

export interface AppState {
  movies: IMoviesState;
}

export const initialAppState: AppState = {
  movies: initialMoviesStateState
};

export function fetInitialState(): AppState {
  return initialAppState;
}

export const appReducers: ActionReducerMap<AppState, any> = {
  movies: moviesReducer
};
