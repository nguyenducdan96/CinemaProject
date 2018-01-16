import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { SeatComponent } from './seat/seat.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { MovieService } from '../service/movie.service';
import { RouterModule } from '@angular/router';
import { MovieModule } from '../movie/movie.module';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [
    CommonModule, RouterModule, MovieModule
  ],
  declarations: [CheckoutComponent, SeatComponent, BookTicketComponent, PaymentComponent],
  exports: [CheckoutComponent, SeatComponent, BookTicketComponent, PaymentComponent],
  providers: [MovieService]
})
export class CheckoutModule { }
