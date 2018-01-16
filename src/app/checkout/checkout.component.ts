import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription';
import { SeatComponent } from './seat/seat.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private listSeat: any = {};
  private movieDetail: any = {};
  private showTimeID: number;
  private movieID: number;
  private activeRender: boolean = false;

  constructor(
    private movieService: MovieService,
    private activatedRouter: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(parameters => {
      this.showTimeID = parameters['showtimeid'];
      this.movieID = parameters['movieid'];
    });
    this.movieService.getCinemaRoomDetail(this.showTimeID).subscribe((result: any) => {
      this.listSeat = result;
      this.activeRender = true;
    }, error => {
      this.listSeat = error;
    });
    this.movieService.getMovieDetailByGroup(this.movieID, 'GP03').subscribe((result1: any) => {
      this.movieDetail = result1;
    }, error => {
      this.movieDetail = error;
    });
  }

}
