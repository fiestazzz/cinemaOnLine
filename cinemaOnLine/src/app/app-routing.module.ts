import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyTicketSuccessComponent } from './components/buy-ticket-success/buy-ticket-success.component';
import { BuyTicketComponent } from './components/buy-ticket/buy-ticket.component';
import { CartComponent } from './components/cart/cart.component';
import { CinemasComponent } from './components/cinemas/cinemas.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginFormComponent},
  {path:'register',component:RegisterFormComponent},
  {path:'success',component:RegisterSuccessComponent},
  {path:'contacts',component:ContactsComponent},
  {path:'cinemas',component:CinemasComponent},
  {path:'configuration',component:ConfigurationComponent},
  {path:'buyTicket',component:BuyTicketComponent},
  {path:'buyTicket-success',component:BuyTicketSuccessComponent},
  {path:'cart',component:CartComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
