import { Component, Input, OnInit } from '@angular/core';
import { IMovie } from '@store/models/muvie.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddMovie } from '@store/actions/movies.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';

@Component({
  selector: 'app-create-update-movie',
  templateUrl: './create-update-movie.component.html'
})
export class CreateUpdateMovieComponent implements OnInit {

  @Input() public movie: IMovie;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private storeMovies: Store<AppState>,
  ) { }

  formMovie: FormGroup;
  editMode = false;
  isLoading = false;
  formTitle = 'Create new movie';
  saveBtnText = 'Create';

  ngOnInit() {
    if (this.movie) {
      this.editMode = true;
      this.formTitle = 'Update movie';
      this.saveBtnText = 'Update';
    }

    this.initForm();
  }

  private   initForm(): void {
    this.formMovie = this.fb.group({
      Title: [this.movie ? this.movie.Title : null, Validators.required],
      Year: [this.movie ? this.movie.Year : null, Validators.required],
      // Runtime: [this.movie ? this.movie.Runtime : null, Validators.required],
      // Genre: [this.movie ? this.movie.Genre : null, Validators.required],
      // Director: [this.movie ? this.movie.Director : null, Validators.required],
      // Plot: [this.movie ? this.movie.Plot : null, Validators.required],
    });
  }

  private getUniqueId(): string {
    return 'tt' + Math.random().toString(36).substr(2, 9);
  }

  private saveData(): void | boolean {

    if (this.formMovie.invalid) {
      return false;
    }

    this.isLoading = true;
    const newMovie = this.formMovie.value;
    newMovie.imdbID = this.editMode ? this.movie.imdbID : this.getUniqueId();

    if (this.editMode) {
      console.log(newMovie);
    } else {
      setTimeout(() => {
        this.storeMovies.dispatch(new AddMovie(newMovie));
        this.isLoading = false;
        this.activeModal.close();
      }, 1000);
    }
  }

}


