import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie';
declare const $: any;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovieComponent implements OnInit, AfterViewInit {
  private urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  @Input() groupID: string;
  @Input() listMovie: Array<Movie>;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    $(function () {
      setTimeout(function () {
        $('.wrapMovie').slick({
          infinite: true,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 4,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      }, 500);
    });
  }

  ngOnInit() {
  }

}
