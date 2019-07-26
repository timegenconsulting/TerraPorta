import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Message } from 'primeng/components/common/api';

import { BillingHistoryService } from './billingHistoryService';

@Component({
  templateUrl: 'billingHistory.component.html',
  providers: [BillingHistoryService]
})
export class BillingHistoryComponent implements OnInit {

  billings = [];

  msgs: Message[] = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BillingHistoryService,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
        response => {
          console.log(response)
          this.billings = response.history;
        },
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:"Not Found"});
        }
    );
  }
}
