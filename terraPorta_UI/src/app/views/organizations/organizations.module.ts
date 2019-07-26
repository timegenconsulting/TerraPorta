import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpService } from 'app/auth/http.service';

import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/growl';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DataTableModule} from 'primeng/datatable';

import { OrganizationsComponent } from './organizations.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrgDetailsComponent } from './orgDetails.component';
import { OrgsResolver } from './resolvers/orgs.resolver.service';
import { OrgDetailResolver } from './resolvers/org.detail.resolver.service';
import { OrganizationsService } from './orgsService';

@NgModule({
  imports: [
    OrganizationsRoutingModule,
    HttpModule,
    CommonModule,
    FormsModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    GrowlModule,
    ConfirmDialogModule,
    DataTableModule
  ],
  declarations: [
    OrganizationsComponent,
    OrgDetailsComponent,
  ],
  providers: [
    HttpService,
    ConfirmationService,
    OrgsResolver,
    OrgDetailResolver,
    OrganizationsService
  ]
})
export class OrganizationsModule { }
