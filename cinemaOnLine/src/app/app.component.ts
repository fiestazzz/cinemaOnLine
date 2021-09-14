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
  visitor:VisitorDTO;
  isShown = false;

  constructor(private loginService:LoginService) {
    this.visitorFromService = this.loginService.visitorIntoService.subscribe(($event)=>{
      this.setVisitor($event);
      localStorage.setItem('Login',JSON.stringify(this.visitor));
    })
   }

  ngOnInit(): void {
    this.setVisitor(JSON.parse(localStorage.getItem('Login'))); 
  }


  setVisitor($event){
    this.visitor = $event
  }

  destroySession(){
    localStorage.clear();
    this.visitor = null;
  }
  


  

}
