import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Message } from 'primeng/components/common/api';

import { PasswordService } from './passwordService';

@Component({
  templateUrl: 'password.component.html',
  providers: [PasswordService]
})
export class PasswordComponent implements OnInit {

  formData = {
    email: ""
  };
  msgs: Message[] = [];

  constructor(
    private router: Router,
    private service: PasswordService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.service.recoveryPassword(this.formData).subscribe(
      response => {
        console.log(response)
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Success!', detail:"The recovery code is sent to your e-mail address."});
      },
      error => {
        console.log('ERROR', error)
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );

  }

}
