import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Message} from 'primeng/components/common/api';

import { ActivationService } from './activationService';

@Component({
  templateUrl: 'activation.component.html',
  providers: [ActivationService]
})
export class ActivationComponent implements OnInit {
  code: string;
  msgs: Message[] = [];
  expire = false;
  activationMessage = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ActivationService
  ) { }

  ngOnInit() {
    this.code = this.route.params['_value']['code'];
    this.service.PutActivation(this.code).subscribe(
        response => {
          console.log(response)
          this.activationMessage = response;
          this.expire = false;
          // this.msgs = [];
          // this.msgs.push({severity:'success', summary:'Success!', detail:response});
          // this.router.navigateByUrl("/login")
        },
        error => {
          console.log('ERROR', error)
          this.activationMessage = error;
          this.expire = true;
          // this.msgs = [];
          // this.msgs.push({severity:'error', summary:'Error!', detail:error});
          // this.router.navigateByUrl("/login")
        }
    );
  }

}

