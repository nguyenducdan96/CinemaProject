import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  private listMovie: Array<Movie>;
  private movieDetail: any = {};
  private groupID: string = 'GP03';
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getMovie().subscribe((result: Array<Movie>) => {
      this.listMovie = result;
    }, error => {
      this.listMovie = error;
    });
  }

}
