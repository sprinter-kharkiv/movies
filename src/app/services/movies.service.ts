import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { IMovie } from '@store/models/muvie.model';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = '&apikey=40b1efcc';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  constructor(private http: HttpClient) {
  }

  getMovies(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(BASE_URL)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  grabMovie(id): Observable<IMovie> {
    return this.http.get<IMovie>(BASE_URL + '?i=' + id + API_KEY)
      .pipe(catchError((error: any) => throwError(error.json())));
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    return of(movie).pipe(timeout(1000));
  }

}
