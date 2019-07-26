import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Message } from 'primeng/components/common/api';

import { RegisterService } from './registerService';

@Component({
  templateUrl: 'register.component.html',
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  regData = {
    username: "",
    email: "",
    password: "",
    r_password: "",
    org: {
      name: "",
      state: "",
      location: "",
      active: true
    },
    first_name: "",
    last_name: "",
  };
  msgs: Message[] = [];

  constructor(
    private router: Router,
    private service: RegisterService
  ) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.regData)

    if (this.regData.password !== this.regData.r_password){
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error!', detail:"Password doesn't match"});
    } else {
      delete this.regData.r_password;
      console.log(this.regData)
      this.service.registry(this.regData).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['pages/success'])
        },
        error => {
          console.log('ERROR', error.org)
          let errorText = ""
          if (error.org){
            errorText = Object.keys(error.org)[0] + " - " + error.org[Object.keys(error.org)[0]];
          } else {
            errorText = Object.keys(error)[0] + " - " + error[Object.keys(error)[0]];
          }

          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:errorText});
        }
      );
    }

    }

}
