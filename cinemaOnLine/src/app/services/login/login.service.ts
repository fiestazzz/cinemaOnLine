import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LoginDTO } from '../../models/login';
import { VisitorDTO } from '../../models/visitor';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  url:string = 'http://localhost:8081/visitors/getByLogin';

  visitorIntoService = new Subject<any>();




  public getUserByLogin(login:LoginDTO):Observable<VisitorDTO>{
   return this.http.post(this.url ,login) as Observable<VisitorDTO>;
  }



  









}
