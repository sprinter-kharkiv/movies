import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrettyTitlePipe } from '@app/pipes/pretty-title.pipe';

@NgModule({
  declarations: [
    PrettyTitlePipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PrettyTitlePipe,
  ]
})
export class SharedPipesModule { }
