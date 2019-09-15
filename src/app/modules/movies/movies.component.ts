import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { IMovie } from '@store/models/muvie.model';
import { DeleteMovie, GrabMovie } from '@store/actions/movies.actions';
import { selectMoviesList } from '@store/selectors/movies.selectors';
import { AppState } from '@store/reducers';
import { DetailListComponent } from '@app/modules/modals/detail-list/detail-list.component';
import { CreateUpdateMovieComponent } from '@app/modules/modals/create-update-movie/create-update-movie.component';
import { ConfirmationComponent } from '@app/modules/modals/confirmation/confirmation.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit, OnDestroy {
  constructor(
    private storeMovies: Store<AppState>,
    private router: Router,
    private modalService: NgbModal,
  ) {
  }

  movies$: Observable<IMovie[]>;
  validIMDb = [
    'tt3896198',
    'tt0120689',
    'tt0479939',
    'tt5137294',
  ];
  private readonly onDestroy = new Subject<void>();

  ngOnInit() {
    this.grabMuvies(this.validIMDb);
    this.getAllMovies();
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
  }

  private showDetail(movie: IMovie): void {
    const modalRef = this.modalService.open(DetailListComponent);
    modalRef.componentInstance.movie = movie;
  }

  private createUpdateMovie(movie?: IMovie): void {
    const options = {
      keyboard: false,
      backdrop: false
    };
    const modalRef = this.modalService.open(CreateUpdateMovieComponent, options);
    modalRef.componentInstance.movie = movie || null;
  }

  private deleteMovie(movie: IMovie): void {
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
