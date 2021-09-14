import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from 'src/app/models/availability';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  url:string = 'http://104.218.55.70:8080/cinemaonline3-1.0.0/availability';
  constructor(private http:HttpClient) { }


  public getAll():Observable<Availability[]>{
    return this.http.get(this.url) as Observable<Availability[]>;
  }

  public getByNameAndDate(availability:Availability):Observable<Availability>{
    const url = this.url + '/getByNameDate';
    return this.http.post(url,availability) as Observable<Availability>
  }

  public addAvailability(availability:Availability):Observable<Availability>{
    return this.http.post(this.url,availability) as Observable<Availability>;
  }


  public update(id:number , availability:Availability):Observable<Availability>{
    const url = this.url + '/' + id;
    return this.http.patch(url,availability) as Observable<Availability>;
  }

}
