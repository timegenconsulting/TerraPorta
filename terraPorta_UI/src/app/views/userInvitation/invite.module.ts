import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';

import { InviteComponent } from './invite.component';
import { InviteRoutingModule } from './invite-routing.module';

@NgModule({
  imports: [
    InviteRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    GrowlModule
  ],
  declarations: [ InviteComponent ]
})
export class InviteModule { }
