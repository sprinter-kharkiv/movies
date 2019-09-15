import { IMovie } from '@store/models/muvie.model';
import { MoviesActions, MoviesActionType } from '@store/actions/movies.actions';

export interface IMoviesState {
  movies: IMovie[];
  selected: IMovie;
}

export const initialMoviesStateState: IMoviesState = {
  movies: [],
  selected: null,
};

export function moviesReducer(state = initialMoviesStateState, action: MoviesActions): IMoviesState {
  switch (action.type) {
    case MoviesActionType.ADD_MOVIE_SUCCESS: {
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    }
    case MoviesActionType.GRAB_MOVIE_SUCCESS: {
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    }
    case MoviesActionType.DELETE_MOVIE_SUCCESS: {
      return {
        ...state,
        movies: [...state.movies.filter(m => m.id !== action.payload.id)],
      };
    }
    case MoviesActionType.UPDATE_MOVIE_SUCCESS: {
      const targetIndex = state.movies.findIndex(m => m.id === action.payload.id);
      state.movies[targetIndex] = {...action.payload};
      return {
        ...state,
        movies: [...state.movies],
      };
    }
    default:
      return state;
  }
}
