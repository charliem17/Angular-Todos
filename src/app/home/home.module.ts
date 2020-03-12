import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { CompletedSectionComponent } from './home/completed-section/completed-section.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';



@NgModule({
  declarations: [
    HomeComponent, 
    CompletedSectionComponent,
    ConfirmationComponent
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
