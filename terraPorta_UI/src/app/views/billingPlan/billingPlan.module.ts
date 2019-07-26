import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DataTableModule} from 'primeng/datatable';
import {EditorModule} from 'primeng/editor';

import { HttpService } from 'app/auth/http.service';

import { BillingPlanComponent } from './billingPlan.component';
import { BillingPlanDetailsComponent } from './billingPlanDetails.component';
import { BillingPlanRoutingModule } from './billingPlan-routing.module';
import { BillingPlanResolver } from './resolvers/billing.plan.resolver.service';
import { BillingPlanService } from './billingPlanService';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    BillingPlanRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    ModalModule.forRoot(),
    ConfirmDialogModule,
    DataTableModule,
    PaginationModule.forRoot(),
    EditorModule,
    NgSelectModule,
  ],
  declarations: [
    BillingPlanComponent,
    BillingPlanDetailsComponent
  ],
  providers: [
    HttpService,
    ConfirmationService,
    BillingPlanResolver,
    BillingPlanService
  ]
})
export class BillingPlanModule { }
