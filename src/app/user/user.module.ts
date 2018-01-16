import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user.component';
import { MyDatePickerModule } from 'mydatepicker';
import { UserService } from '../service/user.service';


@NgModule({
  imports: [
    CommonModule, MyDatePickerModule
  ],
  declarations: [RegisterComponent, UserComponent],
  exports: [RegisterComponent, UserComponent],
  providers: [UserService]
})
export class UserModule { }
