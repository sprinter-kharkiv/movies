import { AppState } from '@store/reducers';
import { createSelector } from '@ngrx/store';
import { IMoviesState } from '@store/reducers/movies.reducer';


const selectMovies = (state: AppState) => state.movies;

export const selectMoviesList = createSelector(
  selectMovies,
  (state: IMoviesState) => state.movies
);

export const selectSelectedMovie = createSelector(
  selectMovies,
  (state: IMoviesState) => state.selected
);
