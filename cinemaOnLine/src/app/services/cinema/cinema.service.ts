import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CinemaDTO } from 'src/app/models/cinema';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  baseUrl:string="http://104.218.55.70:8080/cinemaonline3-1.0.0cinemas";


  constructor(private http:HttpClient) { }


  findCinemaById(cinemaId:number):Observable<CinemaDTO>{
    const url = this.baseUrl + '/' + cinemaId;
    return this.http.get(url) as Observable<CinemaDTO>;
  }
}
