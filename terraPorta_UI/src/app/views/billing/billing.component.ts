import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";

import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";

import { Message } from 'primeng/components/common/api';

import { BillingService } from './billingService';
import { ownerNavigation } from './../../_ownerNav';
import { environment } from 'environments/environment';

import * as delion from "./../../../assets/iota_payment"

console.log(delion)

@Component({
  templateUrl: 'billing.component.html',
  providers: [BillingService]
})
export class BillingComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  defaultData = {
    key: '',
    plans: [{
      id: 0,
      days: 0,
      price: 0.0,
      description: ""
    }]
  };
  billingDisplay = false;
  successDisplay = false;
  plan = {
    id: 0,
    days: 0,
    price: 0.0,
    description: ""
  };
  msgs: Message[] = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'en'
  };

  stripeData: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BillingService,
    private fb: FormBuilder,
    private stripeService: StripeService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(
        response => {
          if (response.billing){
            this.defaultData = response.billing;
          } else {
            this.defaultData = this.defaultData;
          }
        },
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          let errorText = ''
          if(error.detail === 'Not found.'){
            errorText = 'No billing plan was found'
          } else {
            errorText = error.detail
          }
          this.msgs.push({severity:'error', summary:'Error!', detail:error.errorText});
        }
    );
    this.stripeData = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  buy(plan) {
    const name = this.currentUser.username;
    this.stripeService
      .createToken(this.card.getCard(), { name })
      .subscribe(result => {
        if (result.token) {
          console.log(result.token.id);
          let data = {
            'stripeToken': result.token.id,
            'amount': plan.price * 100,
            'days': plan.days,
            'org_id': this.currentUser.org_id,
            'provider': plan.provider_id
          }
          this.service.charge(data).subscribe(
              response => {
                let updateCurrentUser = this.currentUser;
                localStorage.removeItem('authToken');
                localStorage.setItem('authToken', response);
                updateCurrentUser['org_active'] = true;
                localStorage.removeItem('currentUser');
                localStorage.setItem('currentUser', JSON.stringify(updateCurrentUser));
                // ownerNavigation();
                this.successDisplay = true;

              },
              error => {
                console.log('ERROR', error)
                this.msgs = [];
                this.msgs.push({severity:'error', summary:'Error!', detail:error});
              }
          );
        } else if (result.error) {
          console.log(result.error.message);
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:result.error.message});
        }
      });
    this.billingDisplay = false;
  }

  showDialog(plan) {
    this.plan = plan;
    if(plan.provider_id == "IOTA"){
      console.log("iota payment")
      this.iotaPayment(plan)

    } else if(plan.provider_id == "Stripe"){
      this.billingDisplay = true;
    }
  }

  redirectToEvents() {
    this.router.navigate(['events'])
  }

  iotaPayment(plan){
    let envir = 'sandbox';
    let self = this;
    let payment_data = {
      log:[],
      recipient: {}
    }
    if(environment.production === true){
      envir = 'production'
    }

    delion.payment.render({

        env: envir, //'demo', 'sandbox', 'production'
        prefilledPaymentObject: {
            transactions:[
                {
                    recipient_address: environment.iota_account,         //recipient email address
                    description: plan.description,          // payment description
                    amount: { total: plan.price }           // total price
                }
            ]
        },

        // [REQUIRED] When the iframe window calls `window.xprops.onLogin(response)` this callback will be called
        onLogin: function(response) {
            payment_data.log.push(response);
        },

        // [REQUIRED] When the iframe window calls `window.xprops.onExecutePayment(response)` this callback will be called.
        onExecutePayment: function(response) {
            const respObject=JSON.parse(response);
            payment_data.recipient = respObject;
            // example: create 'div' allement and append this to '#delion-payment-container'
            /*
                execute custom backend steps. For examle:
                - post cart and Delion payid to backend
                - compare and validate payid content(...[GET]/payments/PAYID-II...) and amount with the cart content(fraud protection)
                - ..
            */
            const data = {
              'amount': plan.price,
              'days': plan.days,
              'org_id': self.currentUser.org_id,
              'provider': plan.provider_id,
              'payment_data': payment_data
            };

            self.service.charge(data).subscribe(
                response => {
                  let updateCurrentUser = self.currentUser;
                  localStorage.removeItem('authToken');
                  localStorage.setItem('authToken', response);
                  updateCurrentUser['org_active'] = true;
                  localStorage.removeItem('currentUser');
                  localStorage.setItem('currentUser', JSON.stringify(updateCurrentUser));
                  // ownerNavigation();
                  self.successDisplay = true;

                },
                error => {
                  self.msgs = [];
                  self.msgs.push({severity:'error', summary:'Error!', detail:error});
                }
            );
        },
        // [OPTIONAL]
        onCreatePayment: function(response) {
           payment_data.log.push(response);

        }

        /*
        // [OPTIONAL]
        onExit: function(response) {
            // create abort statistics
        }
        */
    },'#delion-payment-container');
  }
}
