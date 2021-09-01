import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VisitorDTO } from './models/visitor';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cinemaOnLine';

  visitorFromService:Subscription;
  visitor:VisitorDTO


  constructor(private loginService:LoginService) {
    this.visitorFromService = this.loginService.visitorIntoService.subscribe(($event)=>{
      this.setVisitor($event);
      sessionStorage.setItem('Login',JSON.stringify(this.visitor));
    })
   }

  ngOnInit(): void {
  }

  setVisitor($event){
    this.visitor = $event
  }

  destroySession(){
    sessionStorage.clear();
    this.visitor = null;
  }
  


  

}
