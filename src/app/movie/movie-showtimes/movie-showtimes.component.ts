import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-movie-showtimes',
  templateUrl: './movie-showtimes.component.html',
  styleUrls: ['./movie-showtimes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MovieShowtimesComponent implements OnInit {
  private urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  private showDate: Array<any>;
  private showTime: Array<any>;
  public status: any = 'bhd';
  public statusCinema: any = 'bhd-1';
  public statusDate: any;
  @Input() movieDetail: any;

  constructor() { }

  GetShowTime(value: any) {
    this.showTime = [];
    for (const i of this.movieDetail.ShowTimes) {
      if (i.DateReady.substr(5, 5) === value) {
        this.showTime.push(i);
      }
    }
  }

  ngOnInit() {
    // Đưa danh sách ngày chiếu vào mảng showDate
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
    console.log(this.showDate);

    // Mặc định hiển thị ngày đầu tiên
    this.statusDate = this.showDate[0];

    // Mặc định hiển thị lịch chiếu ngày đầu tien
    this.showTime = [];
    for (const i of this.movieDetail.ShowTimes) {
      if (i.DateReady.substr(5, 5) === this.showDate[0]) {
        this.showTime.push(i);
      }
    }
  }

}
