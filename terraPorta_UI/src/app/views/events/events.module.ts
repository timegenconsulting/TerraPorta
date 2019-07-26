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
import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';
import { MarkdownModule } from 'ngx-markdown';

import { HttpService } from 'app/auth/http.service';

import { EventsComponent } from './events.component';
import { EventDetailsComponent } from './event.details.component';
import { EventInfoComponent } from './event.info.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventsResolver } from './resolvers/events.resolver.service';
import { EventDetailResolver } from './resolvers/event.detail.resolver.service';
import { EventsService } from './eventsService';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    EventsRoutingModule,
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
    AngularMarkdownEditorModule,
    MarkdownToHtmlModule.forRoot(),
    MarkdownModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
    EventsComponent,
    EventDetailsComponent,
    EventInfoComponent,
  ],
  providers: [
    HttpService,
    ConfirmationService,
    EventsResolver,
    EventDetailResolver,
    EventsService
  ]
})
export class EventsModule { }
