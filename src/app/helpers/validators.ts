import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { Promise } from 'q';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export function ValidateYear(control: FormControl) {
  const maxVal = new Date().getFullYear() + 1;
  const minVal = 1870;
  if (control.value && (maxVal < control.value || minVal > control.value)) {
    return {
      range: {
        msg: 'Wrong year value!'
      }
    };
  }
  return null;
}

export function validateTitleNotTaken(control: AbstractControl, store, id) {
  const args = Array.prototype.slice.call(arguments);
  const storeMovies = args[0];
  const currentId = args[1];
  const titleForCheck = args[2].value.toLowerCase();

  return Promise(
    ( resolve ) => {
      storeMovies.select(state => state.movies).pipe(takeUntil(this.onDestroy))
        .subscribe(res => {
          res.movies.filter(movie => {
            if ( titleForCheck === movie.Title.toLowerCase() && currentId !== movie.id) {
              resolve({ titleInUse: true });
            } else {
              resolve( null );
            }
          });
        });
    });

}

// @Injectable({ providedIn: 'root' })
// export class UniqueAlterEgoValidator implements AsyncValidator {
//   constructor(private storeMovies: Store<AppState>) {}
//
//   validate(
//     ctrl: AbstractControl
//   ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//     return this.storeMovies.select(state => state.movies).pipe(
//       map(isTaken => {
//         console.log('ctrl', ctrl);
//         return (isTaken ? { uniqueAlterEgo: true } : null);
//       }),
//       catchError(() => null)
//     );
//   }
// }

