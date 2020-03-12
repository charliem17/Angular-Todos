import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { CompletedSectionComponent } from './home/home/completed-section/completed-section.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    component: HomeComponent, 
    children: [
      { path: '', redirectTo: 'completed', pathMatch: 'full' },
      { path: 'completed', component: CompletedSectionComponent }
      // { path: 'incomplete', component: }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
