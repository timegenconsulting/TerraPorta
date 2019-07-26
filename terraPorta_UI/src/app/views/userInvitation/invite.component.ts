import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Message} from 'primeng/components/common/api';

import { InviteService } from './inviteService';

@Component({
  templateUrl: 'invite.component.html',
  providers: [InviteService]
})
export class InviteComponent implements OnInit {
  code: string;
  msgs: Message[] = [];
  formData = {
    username: '',
    password: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InviteService
  ) { }

  ngOnInit() {
    this.code = this.route.params['_value']['code'];
    this.service.GetInviteActivation(this.code).subscribe(
        response => {
          console.log(response)
          if (response){
            this.service.PutInviteActivation(this.code, {}).subscribe(
                response => {
                  console.log(response)
                  this.router.navigate(['pages/success_invite'])
                },
                error => {
                  console.log('ERROR', error)
                  this.msgs = [];
                  this.msgs.push({severity:'error', summary:'Error!', detail:error});
                }
            );
          }
        },
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error});
        }
    );
  }
  onSubmit() {
    this.service.PutInviteActivation(this.code, this.formData).subscribe(
        response => {
          console.log(response)
          this.router.navigate(['pages/success_invite'])
        },
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error});
        }
    );
  }

}

