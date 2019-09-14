import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IMovie } from '@store/models/muvie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent {

  @Input()movie: IMovie;
  @Output()editMovie = new EventEmitter<IMovie>();
  @Output()deleteMovie = new EventEmitter<IMovie>();

  public onEditMovie(e: MouseEvent, movie: IMovie): void {
    e.stopPropagation();
    this.editMovie.emit(movie);
  }

  public onDeleteMovie(e: MouseEvent, movie: IMovie): void {
    e.stopPropagation();
    this.deleteMovie.emit(movie);
  }

}
