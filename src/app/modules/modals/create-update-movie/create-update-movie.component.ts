import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IMovie } from '@store/models/muvie.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddMovie, UpdateMovie } from '@store/actions/movies.actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { Subject } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';

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

@Component({
  selector: 'app-create-update-movie',
  templateUrl: './create-update-movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUpdateMovieComponent implements OnInit, OnDestroy {

  @Input() public movie: IMovie;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private storeMovies: Store<AppState>,
    private updates$: Actions,
    private actionsSubj: ActionsSubject,
  ) {
  }

  formMovie: FormGroup;
  editMode = false;
  isLoading = false;
  formTitle = 'Create new movie';
  saveBtnText = 'Create';
  destroyed$ = new Subject<boolean>();
  private readonly onDestroy = new Subject<void>();

  ngOnInit() {
    if (this.movie) {
      this.editMode = true;
      this.formTitle = 'Update movie';
      this.saveBtnText = 'Update';
    }

    this.initForm();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private initForm(): void {
    const asyncTitleValidator = this.validateTitleNotTaken.bind(this, [this.movie ? this.movie.id : '' ]);
    const config = {
      Title: [this.movie ? this.movie.Title : null, Validators.required, asyncTitleValidator],
      Year: [this.movie ? this.movie.Year : null, [Validators.required, ValidateYear]],
      Runtime: [this.movie ? this.movie.Runtime : null, Validators.required],
      Genre: [this.movie ? this.movie.Genre : null, Validators.required],
      Director: [this.movie ? this.movie.Director : null, Validators.required],
      Plot: [this.movie ? this.movie.Plot : null, Validators.required],
    };

    this.formMovie = this.fb.group(config);
  }

  private validateTitleNotTaken(control: AbstractControl) {
    const args = Array.prototype.slice.call(arguments);
    const [currentId] = args[0];
    const titleForCheck = args[1].value.toLowerCase();

    return new Promise(
      ( resolve ) => {
        this.storeMovies.select(state => state.movies).pipe(takeUntil(this.onDestroy))
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

  private getUniqueId(): string {
    return 'tt' + Math.random().toString(36).substr(2, 9);
  }

  public saveData(): void | boolean {

    if (this.formMovie.invalid) {
      return false;
    }

    this.isLoading = true;
    const newMovie = this.formMovie.value;
    newMovie.id = this.editMode ? this.movie.id : this.getUniqueId();

    if (this.editMode) {
      this.updateHandler(newMovie);
    } else {
      this.addHandler(newMovie);
    }

  }

  private addHandler(newMovie: IMovie): void {
    this.storeMovies.dispatch(new AddMovie(newMovie));

    this.actionsSubj.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(data => {
      if (data.type === 'ADD_MOVIE_SUCCESS') {
        this.isLoading = false;
        this.activeModal.close();
      }
    });
  }

  private updateHandler(newMovie: IMovie): void {
    this.storeMovies.dispatch(new UpdateMovie(newMovie));

    this.actionsSubj.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(data => {
      if (data.type === 'UPDATE_MOVIE_SUCCESS') {
        this.isLoading = false;
        this.activeModal.close();
      }
    });
  }

}


