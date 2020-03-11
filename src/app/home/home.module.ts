import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { CompletedSectionComponent } from './home/completed-section/completed-section.component';



@NgModule({
  declarations: [
    HomeComponent, 
    CompletedSectionComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class HomeModule { }
