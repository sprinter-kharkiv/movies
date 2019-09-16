import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  constructor() {}

  year(control: FormControl) {
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

  uniqueTitle(that, storeMovies, id): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return storeMovies.select(state => state.movies).pipe(
        takeUntil(that.onDestroy))
        .subscribe(res => {
          res.movies.filter(movie => {
            if ( control.value === movie.Title.toLowerCase() && id !== movie.id) {
              return { titleInUse: true };
            } else {
              return null;
            }
          });
        });
    };
  }

}
