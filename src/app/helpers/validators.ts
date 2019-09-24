import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomValidators {
  constructor() {
  }

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
    return (control: AbstractControl): any => {
      const movies = storeMovies.select(state => state.movies).pipe(
        takeUntil(that.onDestroy));

      movies.subscribe(res => {
        res.movies.some(movie => {
          if ( control.value && control.value.toLowerCase() === movie.Title.toLowerCase() && id !== movie.id) {
            console.log('error');
            return { titleInUse: {
                msg: 'The same movie title is already exist!'
              } };
          } else {
            console.log('null');
            return null;
          }
        });
      });
    };
  }

}
