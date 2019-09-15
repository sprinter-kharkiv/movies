import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieItemComponent } from '@app/modules/movies/movie-item/movie-item.component';
import { MoviesRoutingModule } from '@app/modules/movies/movies-routing.module';
import { MoviesComponent } from '@app/modules/movies/movies.component';
import { SharedPipesModule } from '@app/pipes/shared-pipes/shared-pipes.module';

@NgModule({
  declarations: [
    MovieItemComponent,
    MoviesComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedPipesModule,
  ]
})
export class MoviesModule {
}
