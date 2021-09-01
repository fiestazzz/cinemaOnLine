import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginFormComponent},
  {path:'register',component:RegisterFormComponent},
  {path:'success',component:RegisterSuccessComponent},
  {path:'',redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
