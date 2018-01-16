import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { UserLogin } from '../Models/user-login';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  // Link trỏ đến api backend
  private apiRegister = 'http://sv.myclass.vn/api/user/registeruser';
  private apiLogin = 'http://sv.myclass.vn/api/user/login';

  constructor(private _http: Http) { }

  public register(user: User): Observable<any> {
    // Để post được json lên server phải có header và body : tùy backend quy định khác nhau
    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // Body là nội dung tham số gửi lên server ở đây là chuỗi json với tên tham số là data (server quy định)
    const body = `data=${JSON.stringify(user)}`;
    const obServe = this._http.post(this.apiRegister, body, { headers: header }).map((result: Response) => result.json());
    return obServe;
  }

  public login(userLogin: UserLogin) {
    // Để post được json lên server phải có header và body : tùy backend quy định khác nhau
    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const body = `data=${JSON.stringify(userLogin)}`;
    // Gọi service đăng nhập
    const userResult: UserLogin = new UserLogin();
    let loginResult;
    const obServe = this._http.post(this.apiLogin, body, { headers: header }).map((result: Response) => result.json());
    obServe.subscribe((result: any) => {
      // Lấy về kết quả => kiểm tra kết quả
      loginResult = result;
      if (loginResult === 'The account or password is incorrect') {
        loginResult = 'Tên Đăng nhập hoặc mật khẩu không đúng!';
      } else {
        // Đăng nhập thành công thì lấy thông tin lưu vào localstorage
        userResult.UserName = loginResult.UserName;
        userResult.FullName = loginResult.FullName;
        userResult.Email = loginResult.Email;
        userResult.Status = loginResult.Status;
        userResult.GroupID = loginResult.GroupID;
        // Xóa localstorage rồi xét lại để tránh bị trùng
        localStorage.removeItem('localUser');
        localStorage.setItem('localUser', JSON.stringify(userResult));
      }
    }, error => {
      loginResult = 'Đã có lỗi xảy ra, đăng nhập không thành công!';
    });
  }

  public checkLogin(): boolean {
    // Kiểm tra localstorage có item localuser chưa, nếu có => đã đăng nhập hoặc ngược lại
    const user = localStorage.getItem('localUser');
    if (user != null) {
      return true;
    }
    return false;
  }

  public getInfoLogin(): UserLogin {
    if (this.checkLogin()) {
      const user: UserLogin = JSON.parse(localStorage.getItem('localUser'));
      return user;
    }
    return null;
  }

  public logout(): void {
    localStorage.removeItem('localUser');
  }
}
