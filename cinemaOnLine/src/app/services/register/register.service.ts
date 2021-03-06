import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VisitorDTO } from 'src/app/models/visitor';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url:string = "http://104.218.55.70:8080/cinemaonline3-1.0.0/visitors/register";

  constructor(private http:HttpClient) { }


  public addVisitor(visitor:VisitorDTO):Observable<VisitorDTO>{
    return this.http.post(this.url,visitor) as Observable<VisitorDTO>;
  }
}
