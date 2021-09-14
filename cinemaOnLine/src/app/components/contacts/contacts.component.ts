import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  panelOpenState = false;
  showMe:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  show(){
    this.showMe = !this.showMe;
  }

}
