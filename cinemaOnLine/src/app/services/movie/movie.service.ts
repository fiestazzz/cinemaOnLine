import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieDTO } from 'src/app/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  url:string = "http://104.218.55.70:8080/cinemaonline3-1.0.0/movies";

  constructor(private http:HttpClient) { }



  public getMovies():Observable<MovieDTO[]>{
    return this.http.get(this.url) as Observable<MovieDTO[]>;
  }

  public addMovie(movie:MovieDTO):Observable<MovieDTO>{
    return this.http.post(this.url,movie) as Observable<MovieDTO>;
  }

  public deleteMovie(movieId):Observable<MovieDTO>{
    const url = this.url + '/' + movieId
    return this.http.delete(url) as Observable<MovieDTO>;
  }
}


