import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService } from './accountService';

import {Message} from 'primeng/components/common/api';

@Component({
  templateUrl: 'account.component.html',
  providers: [AccountService]
})
export class AccountComponent implements OnInit {
  id: number;
  formData= {
    username: "",
    email: "",
    first_name: "",
    last_name: ""
  };
  msgs: Message[] = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccountService
  ) {}

  ngOnInit() {
    this.service.getUser().subscribe(
        response => {
          this.formData = response

        },
        error => {
          console.log('ERROR:', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
        }
    );
  }

  updateAccount(){
    this.service.updateAccount(this.formData)
    .subscribe(
      res => {
        console.log('Updated Account', res);
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info!', detail:"Profile is updated"});
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }

}
