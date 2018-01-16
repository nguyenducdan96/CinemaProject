import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs/Observable';
import {
  Http,
  Response
} from '@angular/http';
import {
  Movie
} from '../models/movie';
import {
  Headers
} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService {
  private apiUrlGetMovie: string = 'http://sv.myclass.vn/api/movie/getmovie';
  private apiUrlGetMovieDetailByGroup: string = 'http://sv.myclass.vn/api/movie/GetMovieDetailByGroup';
  private apiUrlGetCinemaRoomDetail: string = `http://sv.myclass.vn/api/movie/GetCinimaRoomDetail`;
  private apiUrlPostBookingTickets: string = 'http://sv.myclass.vn/api/movie/BookingTickets';

  constructor(private _http: Http) { }

  public getMovie(): Observable<any[]> {
    const obServe: Observable<any> = this._http.get(this.apiUrlGetMovie).map((result: Response) => result.json());
    return obServe;
  }

  public getMovieDetailByGroup(MaPhim: number, MaNhom: string): any {
    const obServe: Observable<any> = this._http.get(`${this.apiUrlGetMovieDetailByGroup}?id=${MaPhim}&groupID=${MaNhom}`)
      .map((result: Response) => result.json());
    return obServe;
  }

  public getCinemaRoomDetail(ShowTimeID: number): Observable<any[]> {
    const obServe: Observable<any> = this._http.get(`${this.apiUrlGetCinemaRoomDetail}?ShowTimeID=${ShowTimeID}`)
      .map((result: Response) => result.json());
    return obServe;
  }

  // Link trỏ đến api backend post thông tin danh sách ghế ngồi đã đặt , ... theo nhóm, theo người dùng
  public postBookingTickets(resultBookTicket: any): Observable<any> {
    // Để post được json lên server phải có header và body : tùy backend quy định khác nhau
    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // Body là nội dung tham số gửi lên server ở đây là chuỗi json với tên tham số là data (server quy định)
    const body = `data=${JSON.stringify(resultBookTicket)}`;
    const obServe = this._http.post(this.apiUrlPostBookingTickets, body, { headers: header })
      .map((result: Response) => result.json());
    return obServe;
  }
}
