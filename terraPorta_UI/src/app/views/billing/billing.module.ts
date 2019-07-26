import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap/modal';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';
import {DialogModule} from 'primeng/dialog';

import { NgxStripeModule } from 'ngx-stripe';

import { environment } from 'environments/environment';

import { BillingComponent } from './billing.component';
import { BillingRoutingModule } from './billing-routing.module';
import { BillingResolver } from './resolvers/billing.resolver.service';
import { BillingService } from './billingService';



@NgModule({
  imports: [
    BillingRoutingModule ,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    DialogModule,
    NgxStripeModule.forRoot(environment.stripe_public_key),
    ModalModule.forRoot(),
  ],
  declarations: [ BillingComponent ],
  providers: [
    BillingResolver,
    BillingService
  ]
})
export class BillingModule { }
