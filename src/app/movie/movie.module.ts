import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieShowtimesComponent } from './movie-showtimes/movie-showtimes.component';
import { RouterModule } from '@angular/router';
import { Ng2PageScrollModule } from 'ng2-page-scroll';

@NgModule({
  imports: [
    CommonModule, RouterModule, Ng2PageScrollModule
  ],
  declarations: [MovieComponent, MovieDetailComponent, MovieShowtimesComponent],
  exports: [MovieComponent, MovieDetailComponent, MovieShowtimesComponent]
})
export class MovieModule { }
