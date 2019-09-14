import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItemComponent } from '@app/modules/movies/movie-item/movie-item.component';
import { MoviesRoutingModule } from '@app/modules/movies/movies-routing.module';
import { MoviesComponent } from '@app/modules/movies/movies.component';

@NgModule({
  declarations: [
    MovieItemComponent,
    MoviesComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
  ]
})
export class MoviesModule {
}
