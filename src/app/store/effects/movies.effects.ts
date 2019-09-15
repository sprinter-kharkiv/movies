import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { MoviesService } from '@services/movies.service';
import { IMovie } from '@store/models/muvie.model';
import {
  AddMovieFailed,
  AddMovieSuccess,
  DeleteMovieFailed,
  DeleteMovieSuccess,
  GrabMovieFailed,
  GrabMovieSuccess,
  MoviesActionType,
  UpdateMovieFailed,
  UpdateMovieSuccess
} from '@store/actions/movies.actions';

@Injectable()
export class MoviesEffects {
  constructor(private actions$: Actions,
              private moviesService: MoviesService,
              private toastr: ToastrService) {
  }

  @Effect()
  grabMovie: Observable<Actions | {}> = this.actions$.pipe(
    ofType(MoviesActionType.GRAB_MOVIE),
    concatMap((action: any) => {
      return this.moviesService
        .grabMovie(action.payload)
        .pipe(
          map((movie: {[key: string]: any}) => {
            const clearedMovie = {
              id: movie.imdbID,
              Title: movie.Title,
              Year: movie.Year,
              Runtime: movie.Runtime,
              Genre: movie.Genre,
              Director: movie.Director,
              Plot: movie.Plot,
            };
            return new GrabMovieSuccess(clearedMovie);
          }),
          catchError(error => of(new GrabMovieFailed(error)))
        );
    })
  );

  @Effect()
  addMovie: Observable<Actions | {}> = this.actions$.pipe(
    ofType(MoviesActionType.ADD_MOVIE),
    switchMap((action: any) => {
      return this.moviesService
        .addMovie(action.payload)
        .pipe(
          map((movie: IMovie) => {
            this.toastr.success(`Movie was saved!`);
            return new AddMovieSuccess(movie);
          }),
          catchError(error => {
            this.toastr.error(error.message, `Movie not saved!`);
            return of(new AddMovieFailed(error));
          })
        );
    })
  );

  @Effect()
  updateMovie: Observable<Actions | {}> = this.actions$.pipe(
    ofType(MoviesActionType.UPDATE_MOVIE),
    switchMap((action: any) => {
      return this.moviesService
        .updateMovie(action.payload)
        .pipe(
          map((movie: IMovie) => {
            this.toastr.success(`Movie was updated!`);
            return new UpdateMovieSuccess(movie);
          }),
          catchError(error => {
            this.toastr.error(error.message, `Movie not updated!`);
            return of(new UpdateMovieFailed(error));
          })
        );
    })
  );

  @Effect()
  deleteMovie: Observable<Actions | {}> = this.actions$.pipe(
    ofType(MoviesActionType.DELETE_MOVIE),
    switchMap((action: any) => {
      return this.moviesService
        .deleteMovie(action.payload)
        .pipe(
          map((movie: IMovie) => {
            this.toastr.success(`Movie was removed!`);
            return new DeleteMovieSuccess(movie);
          }),
          catchError(error => {
            this.toastr.error(error.message, `Movie not removed!`);
            return of(new DeleteMovieFailed(error));
          })
        );
    })
  );

}
