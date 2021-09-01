import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitorDTO } from 'src/app/models/visitor';
import { RegisterService } from 'src/app/services/register/register.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  hide = true;
  username:string;
  password:string;
  name:string;
  surname:string;
  telephone:string;
  email = new FormControl('', [Validators.required, Validators.email]);

  IsFormValid:boolean
  visitorDTO:VisitorDTO
  visitorJustCreated:VisitorDTO




  constructor(private registerService:RegisterService , private router:Router) { }

  ngOnInit(): void {
  }


  Register(){
    this.registerVisitor();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }



  buildVisitorDTO(){
    this.visitorDTO = {
    cod_visitatore:null,
    surname:this.surname,
    name:this.name,
    telephone:this.telephone,
    email:this.email.value,
    login:this.username,
    password:this.password
    }
    return this.visitorDTO;
  }


  registerVisitor(){
    if((this.surname) && (this.name) && (this.username) && (this.password) && (this.telephone) && (this.email.value)){
      this.registerService.addVisitor(this.buildVisitorDTO()).subscribe((data)=>{
        sessionStorage.setItem('Login',JSON.stringify(data));
        this.router.navigate(['/success']);
      });
    }
    else{
      this.IsFormValid = false;
    }
  }

}
