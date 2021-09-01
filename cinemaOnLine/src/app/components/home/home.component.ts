import { Component, OnInit } from '@angular/core';
import { VisitorDTO } from 'src/app/models/visitor';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  constructor() { }

  ngOnInit(): void {
  }
}
