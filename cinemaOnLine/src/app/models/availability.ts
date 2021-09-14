import { NgSwitchDefault } from "@angular/common";

export interface Availability{
    id:number,
    availableAfternoon:number,
    availableEvening:number,
    availableNight:number,
    cinema:string,
    date:string
}