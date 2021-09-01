import { MovieDTO } from "./movie";
import { VisitorDTO } from "./visitor";

export interface TicketDTO{
    cod_operazione:number,
    visitatore:VisitorDTO,
    ora_proiezione:number,
    data:Date,
    tipo_pagamento:string,
    quantity:number,
    movie:MovieDTO

}