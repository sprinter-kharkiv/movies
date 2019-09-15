import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '@store/reducers';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesEffects } from '@store/effects/movies.effects';
import { DetailListComponent } from './modules/modals/detail-list/detail-list.component';
import { ConfirmationComponent } from './modules/modals/confirmation/confirmation.component';
import { CreateUpdateMovieComponent } from './modules/modals/create-update-movie/create-update-movie.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrettyTitlePipe } from '@app/pipes/pretty-title.pipe';
import { SharedPipesModule } from '@app/pipes/shared-pipes/shared-pipes.module';

const effects = [
  MoviesEffects,
];

const toastrConfig = {
  timeOut: 4000,
  positionClass: 'toast-top-right',
  progressBar: true,
};

@NgModule({
  declarations: [
    AppComponent,
    DetailListComponent,
    ConfirmationComponent,
    CreateUpdateMovieComponent,
  ],
  exports: [
    PrettyTitlePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModalModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(toastrConfig),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(effects),
    SharedPipesModule,
  ],
  entryComponents: [
    DetailListComponent,
    ConfirmationComponent,
    CreateUpdateMovieComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
