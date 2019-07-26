import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OrganizationsService } from './orgsService';

import { ConfirmationService, Message } from 'primeng/components/common/api';

@Component({
  templateUrl: 'organizations.component.html',
  providers: [OrganizationsService, ConfirmationService]
})
export class OrganizationsComponent implements OnInit {
  orgs = [];
  msgs: Message[] = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: OrganizationsService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
        response => this.orgs = response.orgs,
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
        }
    );
  }

  details(org){
    this.router.navigate(['organizations', org]);
  }

  showConfirm(org) {
      this.confirmationService.confirm({
        message: "Are you sure you want to delete the organization?",
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
            this.removeOrgs(org);
        }
      })
  }

  removeOrgs(org){
    this.service.removeOrg(org.id)
      .subscribe(
        response => {
          this.orgs = this.orgs.filter(u => u !== org);
          this.msgs = [];
          this.msgs.push({severity:'info', summary:'Info!', detail:'Organization has been deleted'});
        },
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
        }
      );

  }

}
