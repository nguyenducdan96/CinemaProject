import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { MovieService } from '../service/movie.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  private urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  private movieDetail: any = {};
  private movieID: number;
  private groupID: any;
  private activeRender: boolean = false;

  public transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(parameters => {
      this.movieID = parseInt(parameters['id'], 10);
      this.groupID = parameters['groupid'];
    });
    this.movieService.getMovieDetailByGroup(this.movieID, this.groupID).subscribe((result: any) => {
      // Lấy kết quả từ service
      this.movieDetail = result;
      this.movieDetail.TrailerURI = this.transform(this.movieDetail.TrailerURI + '?hd=1&showinfo=0&enablejsapi=1');
      this.movieDetail.ReleaseDate = this.movieDetail.ReleaseDate.substr(0, 10);
      this.activeRender = true;
    }, error => {
      this.movieDetail = error;
    });
  }

}
