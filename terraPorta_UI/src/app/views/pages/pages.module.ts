import { NgModule } from '@angular/core';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { P403Component } from './403.component';
import { P200InviteComponent } from './200Invite.component';
import { P201Component } from './201.component';

import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [ PagesRoutingModule ],
  declarations: [
    P404Component,
    P500Component,
    P403Component,
    P200InviteComponent,
    P201Component,
  ]
})
export class PagesModule { }
