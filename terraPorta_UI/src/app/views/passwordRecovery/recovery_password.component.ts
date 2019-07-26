import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Message } from 'primeng/components/common/api';

import { PasswordService } from './passwordService';

@Component({
  templateUrl: 'recovery_password.component.html',
  providers: [PasswordService]
})
export class RecoveryPasswordComponent implements OnInit {
  code: string;
  formData = {
    new_password: "",
    repeated_password: ""
  };
  msgs: Message[] = [];
  success = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: PasswordService
  ) {}

  ngOnInit() {}

  RecoveryPassword() {
    if (this.formData.new_password !== this.formData.repeated_password){
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error!', detail:"Password doesn't match"});
    }
    else {
      this.code = this.route.params['_value']['code'];
      this.service.putRecoveryPassword(this.code, this.formData).subscribe(
        response => {
          console.log(response)
          this.success = true;
        },
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
        }
      );
    }

  }

}
