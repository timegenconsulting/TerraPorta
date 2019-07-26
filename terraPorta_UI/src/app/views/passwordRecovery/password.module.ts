import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';

import { PasswordComponent } from './password.component';
import { RecoveryPasswordComponent } from './recovery_password.component';
import { PasswordRoutingModule } from './password-routing.module';

@NgModule({
  imports: [
    PasswordRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    MessagesModule,
    MessageModule,
    GrowlModule
  ],
  declarations: [
    PasswordComponent,
    RecoveryPasswordComponent
  ]
})
export class PasswordModule { }
