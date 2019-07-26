import { Component } from '@angular/core';
import { LoginService } from './loginService'
import { Router } from '@angular/router';
import {Message} from 'primeng/components/common/api';


@Component({
  templateUrl: 'login.component.html',
  providers: [LoginService]
})

export class LoginComponent {

  msgs: Message[] = [];
  public username;
  public password;

  constructor(
    private router: Router,
    private loginService:LoginService
  ) { }

  ValidateUser(){
    this.loginService.login(this.username, this.password)
      .subscribe(
        result => {
          if (result === true) {
            this.router.navigateByUrl("/dashboard")
          }
        },
        err => {
          this.router.navigate(['login'])
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:err.detail});
        }
      )
  }

}
