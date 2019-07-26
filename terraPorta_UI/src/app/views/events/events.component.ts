import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EventsService } from './eventsService';

import { ConfirmationService, Message } from 'primeng/components/common/api';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MarkdownService } from 'ngx-markdown';

@Component({
  templateUrl: 'events.component.html',
  providers: [EventsService, ConfirmationService, MarkdownService]
})
export class EventsComponent implements OnInit {
  events= [];
  event_services: string[];
  subscribed = [];
  formData = {
    event: "",
    content: "",
    short_description: "",
    service_id: ""
  };
  msgs: Message[] = [];
  editorOptions = {};
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  public eventModal;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EventsService,
    private confirmationService: ConfirmationService,
    private markdownService: MarkdownService
  ) {}

  ngOnInit() {

    if (!this.currentUser.is_superuser && !this.currentUser.org_billing_active){
      this.router.navigate(['pages/403'])
    }
    this.editorOptions = {
      parser: (val) => this.markdownService.compile(val.trim())
    };

    this.service.getEventServices().subscribe(
      response => {
        console.log(response);
        this.event_services = response
      },
      error => {
        console.log('ERROR', error)
        this.event_services = []
      }
    )

    this.route.data.subscribe(
      response => {
          if (response.events){
            this.events = response.events.events;
            this.subscribed = response.events.subscribed;
          } else {
            this.events = this.events;
            this.subscribed = this.subscribed;
          }
        },
      error => {
          console.log('ERROR', error)
          this.msgs = [];
          let errorText = ''
          if(error.detail === 'Not found.'){
            errorText = 'No event was found'
          } else {
            errorText = error.detail
          }
          this.msgs.push({severity:'error', summary:'Error!', detail:errorText});
      });
  }

  addEvent(){
    this.service.addEvent(this.formData)
    .subscribe(
      res => {
        console.log('Add Event Response', res);
        this.events = [...this.events, res]
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info!', detail:"New event was added!"});
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }

  deleteConfirm(event) {
      this.confirmationService.confirm({
        message: "Are you sure you want to delete the event?",
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
            this.removeEvent(event);
        }
      })
  }

  removeEvent(event){
    this.service.removeEvent(event.id)
      .subscribe(
        response => {
          this.events = this.events.filter(u => u !== event);
          this.msgs = [];
          this.msgs.push({severity:'info', summary:'Info!', detail:'Event has been deleted'});
        },
        error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
        }
      );
  }

  details(event){
    console.log(event)
    this.router.navigate(['events', event]);
  }

  unsubscribeEvent(event){
    console.log(event, this.subscribed)
    this.service.unsubscribeToEvent(event.id)
    .subscribe(
      response => {
        console.log('Unsubscribed', response);
        this.subscribed = this.subscribed.filter(u => u !== event);
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info!', detail:"You have unsubscribed!"});
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }

}
