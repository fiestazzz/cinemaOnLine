import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/models/login';
import { VisitorDTO } from 'src/app/models/visitor';
import { LoginService } from 'src/app/services/login/login.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

 hide = true;
 username:string;
 password:string;

 IsFormValid:boolean

 sendLogin:LoginDTO
 visitor:VisitorDTO;


  constructor(private loginService:LoginService,
    private router:Router) { }



  ngOnInit(): void {
  }


  buildSendObj(){
    this.sendLogin={
      login:this.username,
      password:this.password
    }
    return this.sendLogin;
  }

  Login(){
    if(this.username && this.password){
      this.loginService.getUserByLogin(this.buildSendObj()).subscribe((data)=>{
        this.visitor = data;
        this.IsFormValid = true;
        if(this.visitor){
          this.loginService.visitorIntoService.next(this.visitor);
          if(this.visitor.cod_visitatore == 9){
            this.router.navigate(['/configuration']);
          }
          else if((localStorage.getItem('movie') != null) && (localStorage.getItem('time'))){
            this.router.navigate(['/buyTicket']);
          }
          else{
            this.router.navigate(['/home']);
          }
        }
      })
    }
    else{
      this.IsFormValid = false;
    }
  }




}