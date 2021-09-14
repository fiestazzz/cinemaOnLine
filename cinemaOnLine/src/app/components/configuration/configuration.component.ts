import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PrimeNGConfig } from 'primeng/api';
import { CinemaDTO } from 'src/app/models/cinema';
import { MovieDTO } from 'src/app/models/movie';
import { CinemaService } from 'src/app/services/cinema/cinema.service';
import { MovieService } from 'src/app/services/movie/movie.service';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  IsFormValid:boolean;
  title:string;
  price:number;
  genre:string;
  country:string;
  duration:number;
  distribution:string;
  afternoonTime:string;
  eveningTime:string;
  nightTime:string;
  movie:MovieDTO;
  cinema:CinemaDTO;
  cinemaId:number;
  movies:MovieDTO[];
  idMovie:number;
  modalRef?: BsModalRef;
  titleMessage:string;
  modalMessage:string;

  constructor(
    private cinemaService:CinemaService,
    private movieService:MovieService,
    private primengConfig: PrimeNGConfig,
    private modalService: BsModalService
    ) { }

  ngOnInit(): void {
   this.findMovies();
   this.primengConfig.ripple = true;
  }

  

  buildMovieDto(){
    this.movie = {
      cod_film:null,
      title:this.title,
      startDate:null,
      endDate:null,
      price:this.price,
      genre:this.genre,
      country:this.country,
      duration:this.duration,
      distribution:this.distribution,
      morningTime:null,
      afternoonTime:this.afternoonTime,
      eveningTime:this.eveningTime,
      nightTime:this.nightTime,
      cinema:this.cinema,
    }

    return this.movie;
  }

  findCinema(event){
    
    this.cinemaService.findCinemaById(event).subscribe((cinema)=>{
      if(cinema){
        this.cinema = cinema;
      }
    })
  }

  findMovies(){
    this.movieService.getMovies().subscribe((data)=>{
      this.movies = data;
    })
  }

  

  deleteMovie(template:TemplateRef<any>){
    if(this.idMovie){
      this.movieService.deleteMovie(this.idMovie).subscribe((movie)=>{
        if(movie){
        this.titleMessage = 'Success';
        this.modalMessage = 'Movie successfully deleted';
        this.modalRef = this.modalService.show(template);
          this.findMovies();
        }
      })
    }
    else{
      this.titleMessage = 'Error';
      this.modalMessage = 'Please select a movie';
      this.modalRef = this.modalService.show(template);
    }
    
  }


  addMovie(template: TemplateRef<any>){
    if((this.title != null) &&(this.price != null)&&(this.genre != null)&&(this.country != null)&&(this.duration != null)
    &&(this.distribution != null)&&(this.afternoonTime != null)&&(this.eveningTime != null)&&(this.nightTime != null)&&(this.cinema != null)){
      this.movieService.addMovie(this.buildMovieDto()).subscribe((data)=>{
        this.titleMessage = 'Success';
        this.modalMessage = 'Movie successfully added';
        this.modalRef = this.modalService.show(template);
        this.findMovies();
      })
    }
    else{
      this.titleMessage = 'Error';
      this.modalMessage = 'Please fill in all fields';
      this.modalRef = this.modalService.show(template);
    }
  }




  reset(){
    this.title=null;
    this.price=null;
    this.genre=null;
    this.country=null;
    this.duration=null;
    this.distribution=null;
    this.afternoonTime=null;
    this.eveningTime=null;
    this.nightTime=null;
    this.movie=null;
    this.cinema=null;
   
  }






}
