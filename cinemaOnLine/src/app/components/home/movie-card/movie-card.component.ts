import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { CinemaDTO } from 'src/app/models/cinema';
import { MovieDTO } from 'src/app/models/movie';
import { AvailabilityService } from 'src/app/services/availability/availability.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';






@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  providers: [DatePipe]
})
export class MovieCardComponent implements OnInit {

 @Input() movie:MovieDTO = null;
 @Input() img:any="";

 availabilityObjtoSend:Availability;
 availabilityObjtoPost:Availability;
 AvailabilityFound:Availability;
 noMoreSeatsAvailable:string="No more seats available at this time";
 errorMessage:string = "Error something went wrong";
 redirectMessage:string = "You are being redirect to the login page in three seconds";
 loginMessage:string = "Please Login"
 message:string;
 titleMessage:string;
 modalRef?: BsModalRef;
 dateSelected:string;
  minDate:Date;

 showFiller = false;
  constructor(
    private router:Router,
    private availabilityService:AvailabilityService,
    private modalService: BsModalService,
    private datePipe: DatePipe
    ) { }

  ngOnInit(): void {
   this.minDate = new Date();
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

  buildObjectToPost(cinemaName:string, timeSelected){
    let afternoon;
    let evening;
    let night;
    if(cinemaName == "The Space Cinema"){
      afternoon = 300;
      evening = 300;
      night = 300;
    }
    else if(cinemaName == "Cinema Romano"){
      afternoon = 275;
      evening = 275;
      night = 275;
    }
    else if(cinemaName == "Cinema Lux"){
      afternoon = 250;
      evening = 250
      night = 250;
    }

    this.availabilityObjtoPost = {
      id:null,
      availableAfternoon:afternoon,
      availableEvening:evening,
      availableNight:night,
      cinema:cinemaName,
      date:this.datePipe.transform(new Date(this.dateSelected),"yyyy-MM-dd")
    }
    return this.availabilityObjtoPost
  }

  buyTicket(movie:MovieDTO,timeSelected:string ,template:TemplateRef<any>){
    localStorage.setItem('movie',JSON.stringify(movie));
    localStorage.setItem('time',timeSelected);
    localStorage.setItem('date',this.dateSelected)
    if((localStorage.getItem('Login') != null) && (JSON.parse(localStorage.getItem('Login'))).cod_visitatore != "9"){
    this.availabilityService.getByNameAndDate(this.buildObjToSend(movie.cinema.name,this.dateSelected)).subscribe((data)=>{
      this.AvailabilityFound = data;
      if(this.AvailabilityFound == null){
        this.createAvailability(movie.cinema.name,timeSelected);
      }
      this.router.navigate(['/buyTicket']);
    });
  }
  else{
    this.availabilityService.getByNameAndDate(this.buildObjToSend(movie.cinema.name,this.dateSelected)).subscribe((data)=>{
      if(data == null){
        this.createAvailability(movie.cinema.name,timeSelected);
      }
      this.titleMessage = "Almost there!";
      this.message = this.loginMessage ;
      this.modalRef = this.modalService.show(template);
      
    })
  }
}


  createAvailability(cinemaName ,timeSelected){
     const availabilityDTO = this.buildObjectToPost(cinemaName,timeSelected);
    this.availabilityService.addAvailability(availabilityDTO).subscribe((data)=>{
      const availabilityJustCreated = data;
    })
  }
}
















// if((timeSelected == "10:15") || (timeSelected == "18:15")){
//   let availableSeats = this.AvailabilityFound.availableAfternoon
//   if(availableSeats > 0){
//     this.AvailabilityFound.availableAfternoon = availableSeats - 1;
//     this.availabilityService.update(this.AvailabilityFound.id,this.AvailabilityFound).subscribe((data)=>{

//     })
//   }
//   else{
//     this.titleMessage = "Sorry";
//     this.message = this.noMoreSeatsAvailable ;
//     this.modalRef = this.modalService.show(template);
//   }
// }
// else if((timeSelected == "12:15") || (timeSelected == "20:15")){
//   let availableSeats = this.AvailabilityFound.availableEvening;
//   if(availableSeats > 0){
//     this.AvailabilityFound.availableEvening = availableSeats - 1;
//     console.log(this.AvailabilityFound.availableEvening);
//     this.availabilityService.update(this.AvailabilityFound.id,this.AvailabilityFound).subscribe((data)=>{

//     })
//   }
//   else{
//     this.titleMessage = "Sorry";
//     this.message = this.noMoreSeatsAvailable;
//     this.modalRef = this.modalService.show(template);
//   }
// }
// else if((timeSelected == "15:15") || (timeSelected == "22:15")){
//   let availableSeats = this.AvailabilityFound.availableNight;
//   if(availableSeats > 0){
//     this.AvailabilityFound.availableNight = availableSeats - 1;
//     this.availabilityService.update(this.AvailabilityFound.id,this.AvailabilityFound).subscribe((data)=>{
      
//     })
//   }
//   else{
//     this.titleMessage = "Sorry";
//     this.message = this.noMoreSeatsAvailable;
//     this.modalRef = this.modalService.show(template);
//   }
// }