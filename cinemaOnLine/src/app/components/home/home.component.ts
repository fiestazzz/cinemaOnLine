import { Component, OnInit } from '@angular/core';
import { CinemaDTO } from 'src/app/models/cinema';
import { MovieDTO } from 'src/app/models/movie';
import { VisitorDTO } from 'src/app/models/visitor';
import { LoginService } from 'src/app/services/login/login.service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
 
  movies:MovieDTO[];
  movieImages:any[]=[{description:"../../../assets/darknigth.jpg"},{description:"../../../assets/Oblivion.jpeg"},{description:"../../../assets/dracula-untold-2014-movie-banner-poster.jpg"},{description:"../../../assets/el-americano-the-movie-2014-cartoon.jpg"}];
  
  constructor(private movieService:MovieService) { }


  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data)=>{
      this.movies = data;
    })
  }
}
