import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private userRegister: User;
  constructor(private userService: UserService) { }

  public register(user: any) {
    user.DateOfBirth = user.DateOfBirth.formatted;
    user.DateRegister = new Date();
    user.GroupID = 'GP03';
    this.userService.register(user).subscribe((result: any) => {
      this.userRegister = result;
      if (result === 'Username already exists') {
        
      }
    })
  }
  ngOnInit() {
  }

}
