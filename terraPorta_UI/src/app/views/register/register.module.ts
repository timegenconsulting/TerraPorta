import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';

@NgModule({
  imports: [
    RegisterRoutingModule ,
    CommonModule,
    FormsModule,
    HttpModule,
    MessagesModule,
    MessageModule,
    GrowlModule
  ],
  declarations: [ RegisterComponent ]
})
export class RegisterModule { }
