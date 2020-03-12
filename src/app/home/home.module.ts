import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { TodosDisplayComponent } from './home/todos-display/todos-display.component';



@NgModule({
  declarations: [
    HomeComponent, 
    ConfirmationComponent,
    TodosDisplayComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    ConfirmationComponent
  ]
})
export class HomeModule { }
