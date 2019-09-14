import { Action } from '@ngrx/store';
import { IMovie } from '@store/models/muvie.model';

export const enum MoviesActionType {
  GET_MOVIES = 'GET_MOVIES',
  GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS',
  GET_MOVIES_FAILED = 'GET_MOVIES_FAILED',

  GRAB_MOVIE = 'GRAB_MOVIE',
  GRAB_MOVIE_SUCCESS = 'GRAB_MOVIE_SUCCESS',
  GRAB_MOVIE_FAILED = 'GRAB_MOVIE_FAILED',


  ADD_MOVIE = 'ADD_MOVIE',
  ADD_MOVIE_SUCCESS = 'ADD_MOVIE_SUCCESS',
  ADD_MOVIE_FAILED = 'ADD_MOVIE_FAILED',
  UPDATE_MOVIE = 'UPDATE_MOVIE',
  UPDATE_MOVIE_SUCCESS = 'UPDATE_MOVIE_SUCCESS',
  UPDATE_MOVIE_FAILED = 'UPDATE_MOVIE_FAILED',
  DELETE_MOVIE = 'DELETE_MOVIE',
  DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS',
  DELETE_MOVIE_FAILED = 'DELETE_MOVIE_FAILED',
  GET_MOVIE_BY_ID = 'GET_MOVIE_BY_ID',
  GET_MOVIE_BY_ID_SUCCESS = 'GET_MOVIE_BY_ID_SUCCESS',
  GET_MOVIE_BY_ID_FAILED = 'GET_MOVIE_BY_ID_FAILED',
  SET_MOVIE = 'SET_MOVIE'
}

export class GetMovies implements Action {
  readonly type = MoviesActionType.GET_MOVIES;

  constructor(public payload?: {[key: string]: any}) {
  }
}

export class GetMoviesSuccess implements Action {
  readonly type = MoviesActionType.GET_MOVIES_SUCCESS;

  constructor(public payload: IMovie[]) {
  }
}

export class GetMoviesFailed implements Action {
  readonly type = MoviesActionType.GET_MOVIES_FAILED;

  constructor(public payload: string) {
  }
}

export class GrabMovie implements Action {
  readonly type = MoviesActionType.GRAB_MOVIE;

  constructor(public payload: string) {
  }
}

export class GrabMovieSuccess implements Action {
  readonly type = MoviesActionType.GRAB_MOVIE_SUCCESS;

  constructor(public payload: IMovie) {
  }
}

export class GrabMovieFailed implements Action {
  readonly type = MoviesActionType.GRAB_MOVIE_FAILED;

  constructor(public payload: string) {
  }
}

export class AddMovie implements Action {
  readonly type = MoviesActionType.ADD_MOVIE;

  constructor(public payload: IMovie) {
  }
}

export class AddMovieSuccess implements Action {
  readonly type = MoviesActionType.ADD_MOVIE_SUCCESS;

  constructor(public payload: IMovie) {
  }
}

export class AddMovieFailed implements Action {
  readonly type = MoviesActionType.ADD_MOVIE_FAILED;

  constructor(public payload: string) {
  }
}

// export class UpdateMovie implements Action {
//   readonly type = MoviesActionType.UPDATE_MOVIE;
//
//   constructor(public payload: IMovie) {
//   }
// }
//
// export class UpdateMovieSuccess implements Action {
//   readonly type = MoviesActionType.UPDATE_MOVIE_SUCCESS;
//
//   constructor(public payload: IMovie) {
//   }
// }
//
// export class UpdateMovieFailed implements Action {
//   readonly type = MoviesActionType.UPDATE_MOVIE_FAILED;
//
//   constructor(public payload: string) {
//   }
// }
//
// export class DeleteMovie implements Action {
//   readonly type = MoviesActionType.DELETE_MOVIE;
//
//   constructor(public payload: IMovie) {
//   }
// }
//
// export class DeleteMovieSuccess implements Action {
//   readonly type = MoviesActionType.DELETE_MOVIE_SUCCESS;
//
//   constructor(public payload: IMovie) {
//   }
// }
//
// export class DeleteMovieFailed implements Action {
//   readonly type = MoviesActionType.DELETE_MOVIE_FAILED;
//
//   constructor(public payload: string) {
//   }
// }
//
// export class GetMovieById implements Action {
//   readonly type = MoviesActionType.GET_MOVIE_BY_ID;
//
//   constructor(public payload: number) {
//   }
// }
//
// export class GetMovieByIdSuccess implements Action {
//   readonly type = MoviesActionType.GET_MOVIE_BY_ID_SUCCESS;
//
//   constructor(public payload: IMovie) {
//   }
// }
//
// export class GetMovieByIdFailed implements Action {
//   readonly type = MoviesActionType.GET_MOVIE_BY_ID_FAILED;
//
//   constructor(public payload: number) {
//   }
// }
//
// export class SetMovie implements Action {
//   readonly type = MoviesActionType.SET_MOVIE;
//
//   constructor(public payload: IMovie | {[key: string]: any}) {
//   }
// }


export type MoviesActions =
  GetMovies |
  GetMoviesSuccess |
  GetMoviesFailed |
  GrabMovie |
  GrabMovieSuccess |
  GrabMovieFailed |
  AddMovie |
  AddMovieSuccess |
  AddMovieFailed;
