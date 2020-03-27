import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concat, forkJoin, fromEvent, interval, merge, Observable, of, Subject, timer } from 'rxjs';
import {
  concatAll,
  concatMap,
  delay,
  endWith,
  flatMap,
  map,
  mergeMap,
  switchMap,
  take,
  takeUntil
} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { IMovie } from '@store/models/muvie.model';
import { DeleteMovie, GrabMovie } from '@store/actions/movies.actions';
import { selectMoviesList } from '@store/selectors/movies.selectors';
import { AppState } from '@store/reducers';
import { DetailListComponent } from '@app/modules/modals/detail-list/detail-list.component';
import { CreateUpdateMovieComponent } from '@app/modules/modals/create-update-movie/create-update-movie.component';
import { ConfirmationComponent } from '@app/modules/modals/confirmation/confirmation.component';
import { ajax } from 'rxjs/ajax';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit, OnDestroy {
  constructor(
    private storeMovies: Store<AppState>,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
  ) {
  }

  movies$: Observable<IMovie[]>;
  validTitles = [
    'Guardians of the Galaxy Vol. 2',
    'The Green Mile',
    'Knocking',
    '1 1/2 Hora',
  ];
  private readonly onDestroy = new Subject<void>();

  ngOnInit() {
    // this.cdr.detach();
    // this.grabMuvies(this.validTitles);
    // this.getAllMovies();



    const source = timer( 1000);

    const example = source.pipe(
      switchMap(val => of(`Delayed by: ${val}ms`))
    );

    const subscribe = example.subscribe(val =>
      console.log(`With concatMap: ${val}`)
    );

  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private grabMuvies(arr: string[]): void {
    arr.forEach((mId: string) => this.storeMovies.dispatch(new GrabMovie(mId)));
  }

  private getAllMovies(): void {
    this.movies$ = this.storeMovies.pipe(select(selectMoviesList));
    this.movies$
      .pipe(
        takeUntil(this.onDestroy),
        delay(0))
      .subscribe(() => this.cdr.detectChanges());
  }

  public showDetail(movie: IMovie): void {
    const modalRef = this.modalService.open(DetailListComponent);
    modalRef.componentInstance.movie = movie;
  }

  public createUpdateMovie(movie?: IMovie): void {
    const options = {
      keyboard: false,
      backdrop: false
    };
    const modalRef = this.modalService.open(CreateUpdateMovieComponent, options);
    modalRef.componentInstance.movie = movie || null;
  }

  public deleteMovie(movie: IMovie): void {
    const modalRef = this.modalService.open(ConfirmationComponent);
    modalRef.componentInstance.movie = movie;

    modalRef.componentInstance.result
      .pipe(takeUntil(this.onDestroy))
      .subscribe(($e) => {
        if ($e === 'CONFIRM') {
          this.storeMovies.dispatch(new DeleteMovie(movie));
        }
      });
  }

}
