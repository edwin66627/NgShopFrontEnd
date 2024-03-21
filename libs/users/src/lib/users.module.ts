import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersLoginComponent } from './pages/login/users-login/users-login.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersLoginComponent
  ],
  imports: [
    CommonModule, UsersRoutingModule, InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [
    UsersLoginComponent
  ]
})
export class UsersModule { }
