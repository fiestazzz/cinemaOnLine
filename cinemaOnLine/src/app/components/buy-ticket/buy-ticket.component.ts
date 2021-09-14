import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Availability } from 'src/app/models/availability';
import { CinemaDTO } from 'src/app/models/cinema';
import { MovieDTO } from 'src/app/models/movie';
import { TicketDTO } from 'src/app/models/ticket';
import { VisitorDTO } from 'src/app/models/visitor';
import { AvailabilityService } from 'src/app/services/availability/availability.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css'],
  providers: [DatePipe]
})
export class BuyTicketComponent implements OnInit {

  quantity:number;
  price:number
  ticket:TicketDTO;
  visitor:VisitorDTO;
  cinema:CinemaDTO;
  movie:MovieDTO;
  movieTitle:string;
  date:Date;
  timeSelected:string;
  nameOnTicket:string;
  availabilityObjtoSend:Availability;
  AvailabilityFound:Availability;
  disable:boolean = false;

  noMoreSeatsAvailable:string="No more seats available at this time.";
  errorMessage:string = "Error something went wrong.";
  redirectMessage:string = "You are being redirect to the login page in three seconds.";
  message:string;
  titleMessage:string;
  modalRef?: BsModalRef;


  constructor(private router:Router,
    private availabilityService:AvailabilityService,
    private datePipe: DatePipe,
    private modalService: BsModalService,
    private ticketService:TicketService) { }


  ngOnInit(): void {
    this.movie = JSON.parse(localStorage.getItem('movie'));
    console.log(this.movie)
    this.visitor = JSON.parse(localStorage.getItem('Login'));
    this.date = new Date(localStorage.getItem('date'));
    this.movieTitle= this.movie.title;
    this.timeSelected = localStorage.getItem('time');
    this.nameOnTicket = this.visitor.name + ' ' + this.visitor.surname;

  }

  clearOptions(){
    this.date = null;
    this.timeSelected = null; 
    this.movieTitle = null;
    this.nameOnTicket = null;
    this.price = null;
    this.quantity = null;
  }

  buildObjToSend(selectedCinemaName,selectedDate){
    this.availabilityObjtoSend = {
      id:null,
      availableAfternoon:null,
      availableEvening:null,
      availableNight:null,
      cinema:selectedCinemaName,
      date:this.datePipe.transform(new Date(selectedDate),"yyyy-MM-dd")
    }
    return this.availabilityObjtoSend;
  }

  buildTicket(){
    this.ticket ={
    cod_operazione:null,
    visitatore:this.visitor,
    ora_proiezione:this.timeSelected,
    data:this.datePipe.transform(new Date(this.date),"yyyy-MM-dd"),
    tipo_pagamento:"Pagamento alla cassa",
    quantity:this.quantity,
    film:this.movie
    }
    return this.ticket;
  }

  calculatePrice(event, template:TemplateRef<any>){
    this.availabilityService.getByNameAndDate(this.buildObjToSend(this.movie.cinema.name,this.date)).subscribe((data)=>{
      this.AvailabilityFound = data;
       if((this.timeSelected == "10:15") || (this.timeSelected == "18:15")){
          let availableSeats = this.AvailabilityFound.availableAfternoon
          
          if((availableSeats > 0)&&(availableSeats > event)){
            this.AvailabilityFound.availableAfternoon = availableSeats - event;
          }
          else if((availableSeats > 0)&&(availableSeats < event)){
            this.titleMessage = "Sorry";
            this.message = "Only " + availableSeats + " seats left at this time."
            this.quantity = availableSeats;
            this.AvailabilityFound.availableAfternoon = availableSeats - this.quantity;
            this.modalRef = this.modalService.show(template);
          }
          else{
            this.titleMessage = "Sorry ,you are being redirect to the homepage";
            this.message = this.noMoreSeatsAvailable + "Please check another time." ;
            this.modalRef = this.modalService.show(template);
            this.disable=true;
            setTimeout(() => {
              this.router.navigate(['/home']);
              this.modalService.hide(this.modalRef.id);
            }, 3000);
          }
        }
        else if((this.timeSelected == "12:15") || (this.timeSelected == "20:15")){
          let availableSeats = this.AvailabilityFound.availableEvening;
          if((availableSeats > 0)&&(availableSeats > event)){
            this.AvailabilityFound.availableEvening = availableSeats - event;
          }
          else if((availableSeats > 0)&&(availableSeats < event)){
            this.titleMessage = "Sorry";
            this.message = "Only " + availableSeats + " seats left at this time."
            this.quantity = availableSeats;
            this.AvailabilityFound.availableEvening = availableSeats - this.quantity;
            this.modalRef = this.modalService.show(template);
          }
          else{
            this.titleMessage = "Sorry ,you are being redirect to the homepage";
            this.message = this.noMoreSeatsAvailable + "Please check another time.";
            this.modalRef = this.modalService.show(template);
            this.disable=true;
            setTimeout(() => {
              this.router.navigate(['/home']);
              this.modalService.hide(this.modalRef.id);
            }, 3000);
            
          }
        }
        else if((this.timeSelected == "15:15") || (this.timeSelected == "22:15")){
          let availableSeats = this.AvailabilityFound.availableNight;
          if((availableSeats > 0)&&(availableSeats > event)){
            this.AvailabilityFound.availableNight = availableSeats - event;
          }
          else if((availableSeats > 0)&&(availableSeats < event)){
            this.titleMessage = "Sorry";
            this.message = "Only " + availableSeats + " seats left at this time."
            this.modalRef = this.modalService.show(template);
            this.quantity = availableSeats;
            this.AvailabilityFound.availableNight = availableSeats - this.quantity;
          }
          else{
            this.titleMessage = "Sorry ,you are being redirect to the homepage";
            this.message = this.noMoreSeatsAvailable + "Please check another time.";
            this.modalRef = this.modalService.show(template);
            this.disable=true;
            setTimeout(() => {
              this.router.navigate(['/home'])
            }, 3000);
          }
        }
    })
    this.price = this.movie.price * this.quantity;
  }


  buy(){
    this.availabilityService.update(this.AvailabilityFound.id,this.AvailabilityFound).subscribe((data)=>{
    });
    this.ticketService.addTicket(this.buildTicket()).subscribe((data)=>{
      localStorage.setItem('ticket',JSON.stringify(data));
      this.router.navigate(['/buyTicket-success']);
    })


  }

  reset(){
    this.clearOptions();
    this.router.navigate(['/home']);
  }

}
