import { Component, OnInit, Input, AfterViewInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie';
import { MovieService } from '../../service/movie.service';
declare const $: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent implements OnInit, AfterViewInit {
  @Input() groupID: string;
  @Input() listMovie: Array<Movie>;
  private movieDetail: any = {};
  private showTime: Array<any>;
  private showDate: Array<any>;
  private showTimeID: number;
  constructor(
    private router: Router,
    private movieService: MovieService) { }

  public getIDMovie(value: string) {
    this.movieService.getMovieDetailByGroup(parseInt(value, 10), this.groupID).subscribe((result: any) => {
      this.movieDetail = result;
      this.showDate = [];
      for (const i of this.movieDetail.ShowTimes) {
        let check: boolean = true;
        for (const j of this.showDate) {
          if (i.DateReady.substr(5, 5) === j) {
            check = false;
          }
        }
        if (check === true) {
          this.showDate.push(i.DateReady.substr(5, 5));
        }
      }
      console.log(result);
    }, error => {
      this.movieDetail = error;
    });
  }

  public getShowTime(value: any) {
    this.showTime = [];
    for (const i of this.movieDetail.ShowTimes) {
      if (i.DateReady.substr(5, 5) === value) {
        this.showTime.push(i);
      }
    }
    console.log(this.showTime);
  }

  public getShowTimeID(value: any) {
    this.showTimeID = value;
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('.wrapBanner').slick({
        autoplay: true,
        autoplaySpeed: 2000,
      });
    });
  }

  ngOnInit() {
  }

}
