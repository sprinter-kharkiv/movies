import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, take } from 'rxjs/operators';
import { IMovie } from '@store/models/muvie.model';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = '&apikey=40b1efcc';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  constructor(private http: HttpClient) {
  }

  grabMovie(id): Observable<IMovie> {
    return this.http.get<IMovie>(BASE_URL + '?i=' + id + API_KEY)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    return of(movie).pipe(delay(1200), take(1));
  }

  deleteMovie(movie: IMovie): Observable<IMovie> {
    return of(movie).pipe(delay(1200), take(1));
  }

  updateMovie(movie: IMovie): Observable<IMovie> {
    return of(movie).pipe(delay(1200), take(1));
  }

}
