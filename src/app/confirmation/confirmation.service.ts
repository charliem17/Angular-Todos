import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  
  listener: Subject<boolean>;

  constructor() { 
    this.listener = new Subject<boolean>();
  }
}
