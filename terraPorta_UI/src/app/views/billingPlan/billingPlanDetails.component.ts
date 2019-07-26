import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { } from '@types/googlemaps';

import { BillingPlanService } from './billingPlanService';

import { ConfirmationService, Message } from 'primeng/components/common/api';

@Component({
  templateUrl: 'billingPlanDetails.component.html',
  providers: [BillingPlanService, ConfirmationService]
})
export class BillingPlanDetailsComponent implements OnInit {
  id: number;
  formData = {
    days: 0,
    price: 0.0,
    description: "",
    provider_id: ""
  };
  providers = [];
  msgs: Message[] = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BillingPlanService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.id = this.route.params['_value']['id'];
    this.service.getBillingPlan(this.id).subscribe(
        response => {
          console.log(response)
          this.formData = response;
        },
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
        }
    );
    this.service.getBillingProviders().subscribe(
      response => {
        console.log(response);
        this.providers = response
      },
      error => {
        console.log('ERROR', error)
        this.providers = []
      }
    )
  }

  updateBillingPlan(){
    this.service.updateBillingPlan(this.formData)
    .subscribe(
      res => {
        console.log('Update Plan Response', res);
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info!', detail:"Billing Plan is updated!"});
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }

  deletePlanConfirm() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the plan?",
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
          this.removePlan();
      }
    })
  }

  removePlan(){
    this.id = this.route.params['_value']['id'];
    this.service.removeBillingPlan(this.id)
    .subscribe(
      response => {
        console.log('Deleted', response);
        this.router.navigate(['billing_plan']);
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }
}
