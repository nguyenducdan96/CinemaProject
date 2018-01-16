import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovieDetailComponent implements OnInit {
  @Input() movieDetail: any;
  constructor() { }

  ngOnInit() {
  }

}
