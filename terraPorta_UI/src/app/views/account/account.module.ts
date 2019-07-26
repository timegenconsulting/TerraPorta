import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';

import { HttpService } from 'app/auth/http.service';

import { AccountComponent } from './account.component';
import { AccountDetailComponent } from './accountDetail.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    AccountRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    GrowlModule
  ],
  declarations: [
    AccountComponent,
    AccountDetailComponent
  ],
  providers: [
    HttpService,
  ]
})
export class AccountModule { }
