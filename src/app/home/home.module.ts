import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BannerComponent } from './banner/banner.component';
import { MovieComponent } from './movie/movie.component';
import { CinemaComponent } from './cinema/cinema.component';
import { NewsComponent } from './news/news.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { RouterModule } from '@angular/router';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule, PerfectScrollbarModule, RouterModule
  ],
  declarations: [HomeComponent, BannerComponent, MovieComponent, CinemaComponent, NewsComponent],
  exports: [HomeComponent, BannerComponent, MovieComponent, CinemaComponent, NewsComponent],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
  ]
})
export class HomeModule { }
