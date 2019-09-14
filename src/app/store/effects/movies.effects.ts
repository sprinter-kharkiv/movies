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
  GetMoviesFailed,
  GetMoviesSuccess, GrabMovieFailed,
  GrabMovieSuccess,
  MoviesActions,
  MoviesActionType
} from '@store/actions/movies.actions';

@Injectable()
export class MoviesEffects {
  constructor(private actions$: Actions,
              private moviesService: MoviesService,
              private toastr: ToastrService) {
  }

  @Effect()
  getMovies: Observable<Actions | {}> = this.actions$.pipe(
    ofType(MoviesActionType.GET_MOVIES),
    switchMap((action: { [key: string]: any }) => {
      return this.moviesService
        .getMovies()
        .pipe(
          map((movies: IMovie[]) => new GetMoviesSuccess(movies)),
          catchError(error => of(new GetMoviesFailed(error)))
        );
    })
  );

  @Effect()
  grabMovie: Observable<Actions | {}> = this.actions$.pipe(
    ofType(MoviesActionType.GRAB_MOVIE),
    concatMap((action: any) => {
      return this.moviesService
        .grabMovie(action.payload)
        .pipe(
          map((movie: IMovie) => new GrabMovieSuccess(movie)),
          catchError(error => of(new GrabMovieFailed(error)))
        );
    })
  );

  @Effect()
  addMovie: Observable<Actions | {}> = this.actions$.pipe(
    ofType(MoviesActionType.ADD_MOVIE),
    concatMap((action: any) => {
      return this.moviesService
        .addMovie(action.payload)
        .pipe(
          map((movie: IMovie) => {
            console.log('sss')
            this.toastr.success(`Movie was saved!`);
            return new AddMovieSuccess(movie);
          }),
          catchError(error => {
            this.toastr.error(error.message, `Movie not saved!`);
            return  of(new AddMovieFailed(error));
          })
        );
    })
  );

  // @Effect()
  // addMovie: Observable<Actions | {}> = this.actions$.pipe(
  //   ofType(actions.UserActionType.ADD_USER),
  //   switchMap((action: any) => {
  //     return this.moviesService.createUser(action.payload).pipe(
  //       map((user: IMovie) => {
  //         this.toastr.success(`User ${action.payload.name} was saved!`);
  //         return new actions.AddUserSuccess(user);
  //       }),
  //       catchError(error => {
  //         this.toastr.error(error.message, `User not saved!`);
  //         return of(new actions.AddUserFailed(error));
  //       })
  //     );
  //   })
  // );
  //
  // @Effect()
  // deleteMovie: Observable<Actions | {}> = this.actions$.pipe(
  //   ofType(actions.UserActionType.DELETE_USER),
  //   switchMap((action: any) => {
  //     return this.moviesService.deleteUser(action.payload.id).pipe(
  //       map(() => {
  //         this.toastr.success(`Данные ученика ${action.payload.firstName} ${action.payload.lastName} были успешно удалены!`);
  //         return new actions.DeleteUserSuccess(action.payload);
  //       }),
  //       catchError(error => {
  //         this.toastr.error(error.message, `Данные ученика не удалены!`);
  //         return of(new actions.DeleteUserFailed(error));
  //       })
  //     );
  //   })
  // );
  //
  // @Effect()
  // updateUser: Observable<Actions | {}> = this.actions$.pipe(
  //   ofType(actions.UserActionType.UPDATE_USER),
  //   switchMap((action: any) => {
  //     return this.moviesService.updateUser(action.payload).pipe(
  //       map((user: IMovie) => {
  //         this.toastr.success(`Данные ученика ${action.payload.firstName} ${action.payload.lastName} были успешно изменены!`);
  //         return new actions.UpdateUserSuccess(user);
  //       }),
  //       catchError(error => {
  //         this.toastr.error(error.message, `Данные ученика не изменены!`);
  //         return of(new actions.UpdateUserFailed(error));
  //       })
  //     );
  //   })
  // );
  //
  // @Effect()
  // getUser: Observable<Actions | {}> = this.actions$.pipe(
  //   ofType(actions.UserActionType.GET_USER_BY_ID),
  //   switchMap((action: any) => {
  //     return this.moviesService.getUserById(action.payload).pipe(
  //       map((user: IMovie) => {
  //         return new actions.GetUserByIdSuccess(user);
  //       }),
  //       catchError(error => of(new actions.GetUserByIdFailed(error)))
  //     );
  //   })
  // );
}
