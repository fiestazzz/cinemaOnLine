import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataStateChangeEvent, FilterService, GridDataResult } from '@progress/kendo-angular-grid';
import { process, State } from '@progress/kendo-data-query';
import { TicketDTO } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import {
  filterBy,
  FilterDescriptor,
  CompositeFilterDescriptor,
} from "@progress/kendo-data-query";
import { SelectItem } from 'primeng/api';


const flatten = (filter) => {
  const filters = (filter || {}).filters;
  if (filters) {
    return filters.reduce(
      (acc, curr) => acc.concat(curr.filters ? flatten(curr) : [curr]),
      []
    );
  }
  return [];
};






@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [DatePipe]
})
export class CartComponent implements OnInit {



  GridDataList:TicketDTO[];
  loading:boolean = false;
  GridDataResult:GridDataResult
  gridState:State = {
    skip:0,
    take:10,
    sort:[{field:'data',dir:'asc'}]
  }

  filterByTime:any[]=[];
  
  public times:SelectItem[]=[
    {title:"10:15",value:"10:15"},
    {title:"12:15",value:"12:15"},
    {title:"15:15",value:"15:15"},
    {title:"18:15",value:"18:15"},
    {title:"20:15",value:"20:15"},
    {title:"22:15",value:"22:15"},
  ]

  constructor(private ticketService:TicketService,
    public datePipe: DatePipe,) { }



  ngOnInit(): void {
    this.LoadGridData();
    this.ChangeGridData();
    
  }


  GridDataStateChange(state:DataStateChangeEvent):void{
    this.loading = true;
    this.gridState = state;
    this.ChangeGridData();
  }

  ChangeGridData(){
    this.GridDataResult = process(this.GridDataList || [] , this.gridState);
    this.loading = false;
  }


  LoadGridData(){
    this.ticketService.getTicket().subscribe((data)=>{
      this.GridDataList = data;
      this.ChangeGridData();
    })
  }


 Filters(filter:CompositeFilterDescriptor){
  this.filterByTime.splice(
    0,
    this.filterByTime.length,
    ...flatten(filter).map(({ value }) => value)
  );
  return this.filterByTime;
}

public categoryChange(values: any[], filterService: FilterService): void {
  console.log(values);
  filterService.filter({
    filters: values.map((value) => ({
      field: "ora_proiezione",
      operator: "eq",
      value,
    })),
    logic: "or",
  });
}



}
