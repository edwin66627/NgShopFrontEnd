import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UsersLoginComponent } from './pages/login/users-login/users-login.component';

const routes: Routes = [
  {
    path: 'login', component: UsersLoginComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)] // Root, in this case, is the app.module, This module is a child
})
export class UsersRoutingModule { }
