import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from './confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.less']
})
export class ConfirmationComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  sendConfirmation(confirmation: boolean): void {
    this.confirmationService.listener.next(confirmation);
  }

}
