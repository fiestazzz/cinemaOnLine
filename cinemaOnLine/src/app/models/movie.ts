import { CinemaDTO } from "./cinema";

export interface MovieDTO{
    cod_film:number,
    title:string,
    startDate:Date,
    endDate:Date,
    price:number,
    genre:string,
    country:string,
    duration:number,
    distribution:string
    morningTime:string,
    afternoonTime:string,
    eveningTime:string,
    nightTime:string,
    cinema:CinemaDTO
}