import { MovieDTO } from "./movie";
import { VisitorDTO } from "./visitor";

export interface TicketDTO{
    cod_operazione:number,
    visitatore:VisitorDTO,
    ora_proiezione:string,
    data:string,
    tipo_pagamento:string,
    quantity:number,
    film:MovieDTO

}