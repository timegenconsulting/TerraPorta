import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmationService, Message } from 'primeng/components/common/api';

import { BillingPlanService } from './billingPlanService';

@Component({
  templateUrl: 'billingPlan.component.html',
  providers: [BillingPlanService, ConfirmationService]
})
export class BillingPlanComponent implements OnInit {

  key: "";
  formData = {
    days: 0,
    price: 0.0,
    description: "",
    provider_id: ""
  };
  providers = [];
  msgs: Message[] = [];
  plans = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BillingPlanService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
        response => {
          this.plans = response.plans;
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

  addPlan(){
    this.service.addBillingPlan(this.formData)
    .subscribe(
      res => {
        console.log('Add Plan Response', res);
        this.plans = [...this.plans, res]
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info!', detail:"New Billing Plan was added!"});
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }

  deleteConfirm(plan) {
      this.confirmationService.confirm({
        message: "Are you sure you want to delete the plan?",
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
            this.removePlan(plan);
        }
      })
  }

  removePlan(plan){
    this.service.removeBillingPlan(plan.id)
      .subscribe(
        response => {
          this.plans = this.plans.filter(u => u !== plan);
          this.msgs = [];
          this.msgs.push({severity:'info', summary:'Info!', detail:'Plan has been deleted'});
        },
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
        }
      );
  }

  details(id){
    console.log(id)
    this.router.navigate(['billing_plan', id]);
  }
}
