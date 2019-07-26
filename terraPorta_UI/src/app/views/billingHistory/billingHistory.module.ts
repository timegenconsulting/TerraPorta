import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { ModalModule } from 'ngx-bootstrap/modal';

import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DataTableModule} from 'primeng/datatable';

import { BillingHistoryComponent } from './billingHistory.component';
import { BillingHistoryRoutingModule } from './billingHistory-routing.module';
import { BillingHistoryResolver } from './resolvers/billing.history.resolver.service';
import { BillingHistoryService } from './billingHistoryService';


@NgModule({
  imports: [
    BillingHistoryRoutingModule ,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    DialogModule,
    DataTableModule,
    ConfirmDialogModule,
    ModalModule.forRoot(),
  ],
  declarations: [ BillingHistoryComponent ],
  providers: [
    ConfirmationService,
    BillingHistoryResolver,
    BillingHistoryService
  ]
})
export class BillingHistoryModule { }
