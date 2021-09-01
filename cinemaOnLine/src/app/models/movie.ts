import { CinemaDTO } from "./cinema";

export interface MovieDTO{
    cod_film:number,
    title:string,
    startDate:Date,
    endDate:Date,
    price:number,
    cinema:CinemaDTO
}