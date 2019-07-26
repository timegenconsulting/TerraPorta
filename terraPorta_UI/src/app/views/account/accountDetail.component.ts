import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService } from './accountService';

import {Message} from 'primeng/components/common/api';

@Component({
  templateUrl: 'accountDetail.component.html',
  providers: [AccountService]
})
export class AccountDetailComponent implements OnInit {
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

  update() {

  }
  ngOnInit() {
    this.id = this.route.params['_value']['id'];
    this.service.getUserDetail(this.id).subscribe(
        response => {
          this.formData = response;
        },
        error => {
          console.log('ERROR:', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
        }
    );
  }

}
