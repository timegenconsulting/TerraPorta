import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';

import { ActivationComponent } from './activation.component';
import { ActivationRoutingModule } from './activation-routing.module';

@NgModule({
  imports: [
    ActivationRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    GrowlModule
  ],
  declarations: [ ActivationComponent ]
})
export class ActivationModule { }
