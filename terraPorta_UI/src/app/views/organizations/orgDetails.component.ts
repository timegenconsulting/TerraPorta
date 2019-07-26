import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrganizationsService } from './orgsService';
import { OrganizationsModel } from './orgs.model';

import {Message} from 'primeng/components/common/api';

@Component({
  templateUrl: 'orgDetails.component.html',
  providers: [OrganizationsService]
})
export class OrgDetailsComponent implements OnInit {
  id: number;
  formData = {
    name: "",
    owner: "",
    owner_name: "",
    location: "",
    state: "",
    left_days: "",
    billing_is_active: false,
    requests_no: 0,
    members_list: [],
    billing_history: [],
    id: 0
  };
  display = false;
  msgs: Message[] = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OrganizationsService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
        response => {
          this.formData = response.org

        },
        error => {
          console.log('ERROR:', error)
          this.router.navigate(['login'])
        }
    );
  }

  update(){
    this.service.updateOrg(this.formData)
    .subscribe(
      res => {
        console.log('Updated Org', res);
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info!', detail:"Organization is updated"});
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }

  userDetail(user){
    this.router.navigate(['user', user['id']]);
  }

  deleteOrg(){
    this.id = this.route.params['_value']['id'];
    this.service.removeOrg(this.id)
    .subscribe(
      response => {
        console.log('Deleted', response);
        this.router.navigate(['/']);
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }

  inviteUsers(org, email){
    console.log(org, email)
    let data = {'email': email}
    this.service.inviteUsers(org, data)
    .subscribe(
      res => {
        console.log('Response', res);
        this.msgs = [];
        this.msgs.push({severity:'success', summary:'Success!', detail: res});
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    )
    this.display = false;
  }

  showDialog() {
      this.display = true;
    }

  openBilling(){
    this.router.navigate(['billing'])
  }

}
