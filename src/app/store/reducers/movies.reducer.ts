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

export const moviesReducer = (
  state = initialMoviesStateState,
  action: MoviesActions
): IMoviesState => {
  switch (action.type) {
    case MoviesActionType.ADD_MOVIE_SUCCESS: {
      // const newFilm: IMovie = action.payload;
      return {
        ...state,
        movies: [...state.movies, action.payload],
        // selected: action.payload,
      };
    }
    case MoviesActionType.GRAB_MOVIE_SUCCESS: {
      // const newFilm: IMovie = action.payload;
      return {
        ...state,
        movies: [...state.movies, action.payload],
        // selected: action.payload,
      };
    }
    // case actions.UserActionType.UPDATE_USER_SUCCESS: {
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
    // }
    // case actions.UserActionType.DELETE_USER_SUCCESS: {
    //   return {
    //     ...state
    //   };
    // }
    // case actions.UserActionType.GET_USER_BY_ID_SUCCESS: {
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
    // }
    // case actions.UserActionType.SET_USER: {
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
    // }
    default:
      return state;
  }
};
