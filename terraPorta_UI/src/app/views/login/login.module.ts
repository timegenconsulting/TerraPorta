import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from "@angular/forms";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

@NgModule({
  imports: [ FormsModule, LoginRoutingModule, MessagesModule, MessageModule ],
  declarations: [ LoginComponent ]
})
export class LoginModule { }
