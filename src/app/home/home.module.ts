import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { CompletedSectionComponent } from './home/completed-section/completed-section.component';



@NgModule({
  declarations: [
    HomeComponent, 
    CompletedSectionComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
