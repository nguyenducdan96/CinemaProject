import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { BookTicket } from '../../models/book-ticket';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {
  private urlHost: string = 'http://sv.myclass.vn/Images/Movies/';
  private resultBooking: BookTicket = new BookTicket();
  private listSeatNameSelected: Array<any> = [];
  private dateShow: any;
  private timeShow: any;
  private roomShow: any;
  @Input() listSeat: any;
  @Input() movieDetail: any;
  // Two-way Binding Cập nhật giá tiền trên view khi chọn ghế hoặc chọn combo
  @Input() priceTotal: number = 0;
  @Input() priceCombo: number = 0;
  @Input() priceTicketTotal: number = 0;
  @Input() seatNameSelected: string = '';
  @Output() priceTotalChange = new EventEmitter<number>();
  @Output() priceComboChange = new EventEmitter<number>();
  @Output() priceTicketTotalChange = new EventEmitter<number>();
  @Output() seatNameSelectedChange = new EventEmitter<string>();
  constructor() { }

  public bookSeat(seatStatus: boolean, seatID: any, count: number, priceTicket: number) {
    const ticket: Ticket = new Ticket();
    if (seatStatus) {
      this.priceTicketTotal += priceTicket;
      // Push vào mảng ticket của object để đẩy lên server
      ticket.SeatID = this.listSeat.Seats[count].SeatID;
      ticket.Price = this.listSeat.Seats[count].Price;
      this.resultBooking.Tickets.push(ticket);
      console.log(this.resultBooking);
      // Push vào mảng tên để hiện thị lên giao diện
      this.listSeatNameSelected.push(this.listSeat.Seats[count].SeatName);
      console.log(this.listSeatNameSelected);
      this.priceTotal = this.priceCombo + this.priceTicketTotal;
    }
    if (!seatStatus) {
      this.priceTicketTotal -= priceTicket;
      // Xóa khỏi mảng ticket của object để đẩy lên sv
      for (const i in this.resultBooking.Tickets) {
        if (this.listSeat.Seats[count].SeatID === this.resultBooking.Tickets[i].SeatID) {
          this.resultBooking.Tickets.splice(parseInt(i, 10), 1);
        }
      }
      console.log(this.resultBooking);
      // Xóa khỏi mảng tên
      for (const i in this.listSeatNameSelected) {
        if (this.listSeat.Seats[count].SeatName === this.listSeatNameSelected[i]) {
          this.listSeatNameSelected.splice(parseInt(i, 10), 1);
        }
      }
      this.priceTotal = this.priceCombo + this.priceTicketTotal;
    }
    this.seatNameSelected = '';
    for (const name of this.listSeatNameSelected) {
      this.seatNameSelected += name + '  ';
    }

    this.priceTicketTotalChange.emit(this.priceTicketTotal);
    this.priceTotalChange.emit(this.priceTotal);
    this.seatNameSelectedChange.emit(this.seatNameSelected);

    this.resultBooking.ShowTimeID = this.listSeat.ShowTimeID;
    this.resultBooking.GroupID = 'GP03';
    this.resultBooking.UserID = (JSON.parse(localStorage.getItem('localUser'))).UserName;
  }

  public getPriceCombo(value: string) {
    if (value === '1') {
      this.priceCombo = 100;
    } else if (value === '2') {
      this.priceCombo = 80;
    } else if (value === '3') {
      this.priceCombo = 60;
    } else if (value === '4') {
      this.priceCombo = 40;
    } else if (value === '5') {
      this.priceCombo = 20;
    } else {
      this.priceCombo = 0;
    }
    this.priceTotal = this.priceTicketTotal + this.priceCombo;
  }

  ngOnInit() {
    console.log(this.listSeat);
    for (const showTime of this.movieDetail.ShowTimes) {
      if (showTime.ShowTimeID === this.listSeat.ShowTimeID) {
        this.dateShow = showTime.DateReady.substr(5, 5);
        this.timeShow = showTime.StartDate.substr(0, 5);
        this.roomShow = showTime.CinimaRoomID;
      }
    }
  }

}
