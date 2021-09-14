import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketDTO } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  url:string= "http://104.218.55.70:8080/cinemaonline3-1.0.0/tickets";
  constructor(private http:HttpClient) { }


  public getTicket():Observable<TicketDTO[]>{
    return this.http.get(this.url) as Observable<TicketDTO[]>;
  }

  public getTicketById(id:number):Observable<TicketDTO>{
    const url = this.url + "/" + id
    return this.http.get(url) as Observable<TicketDTO>;
  }

  public addTicket(ticket:TicketDTO):Observable<TicketDTO>{
    return this.http.post(this.url,ticket) as Observable<TicketDTO>
  }



}
