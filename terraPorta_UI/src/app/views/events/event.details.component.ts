import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { } from '@types/googlemaps';

import { EventsService } from './eventsService';

import { ConfirmationService, Message } from 'primeng/components/common/api';
import { MarkdownService } from 'ngx-markdown';

@Component({
  templateUrl: 'event.details.component.html',
  providers: [EventsService, ConfirmationService, MarkdownService]
})
export class EventDetailsComponent implements OnInit {
  id: number;
  formData = {
    event: "",
    owner: "",
    service_id: "",
    created: "",
    content: "",
    short_description: "",
    user_subscribed: false
  };
  subscribed = [];
  event_services = [];
  subUrl: string;
  hook_type="Email";
  hook_type_placeholder = {
    "Email": "example@example.com",
    "Url": "https://example.com/alert"
  };
  msgs: Message[] = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  editorOptions = {}

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  latitude:number;
  longitude:number;
  maxMoisture:number;
  minMoisture:number;
  radius:number=5000;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EventsService,
    private confirmationService: ConfirmationService,
    private markdownService: MarkdownService
  ) {}

  ngOnInit() {
    this.id = this.route.params['_value']['id'];
    if (!this.currentUser.is_superuser && !this.currentUser.org_active){
      this.router.navigate(['pages/403'])
    }
    const self = this;
    var mapProp = {
      center: new google.maps.LatLng(56.69092485626631, -100.32139841289808),
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    google.maps.event.addListener(this.map, 'click', function(event) {
      self.changePosition(event);
    })

    this.service.getEventServices().subscribe(
      response => {
        console.log(response);
        this.event_services = response
      }
    )

    this.route.data.subscribe(
      response => {
          console.log(response)
          this.formData = response.event.event;
          this.subscribed = response.event.subscribed;
        },
      error => {
          console.log('ERROR', error)
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
    console.log("form data", this.formData)
  }

  updateEvent(){
    console.log(this.formData)
    this.service.updateEvent(this.formData)
    .subscribe(
      res => {
        console.log('Update Event Response', res);
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Info!', detail:"Event is updated!"});
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }

  deleteConfirm() {
      this.confirmationService.confirm({
        message: "Are you sure you want to delete the event?",
        header: 'Delete Confirmation',
        icon: 'fa fa-trash',
        accept: () => {
            this.removeEvent();
        }
      })
  }

  removeEvent(){
    this.id = this.route.params['_value']['id'];
    this.service.removeEvent(this.id)
    .subscribe(
      response => {
        console.log('Deleted', response);
        this.router.navigate(['events']);
      },
      error => {
        console.log('ERROR', error);
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
      }
    );
  }
  subscribeToEvent(data){
    let hook_type = 'email';
    let urlregex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(emailregex.test(this.subUrl))
    console.log(urlregex.test(this.subUrl))
    if (!this.subUrl){
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error!', detail:"You did not enter email or url for subscribe"});
    }else{
      if (this.hook_type === "Email" && !emailregex.test(this.subUrl)){
         this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:"Please enter a valid EMAIL or URL."});
      } else if(this.hook_type === "Url" && !urlregex.test(this.subUrl)){
         this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error!', detail:"Please enter a valid EMAIL or URL."});
      }else {
        let subsData = {
          'hook_link': this.subUrl,
          'hook_type': this.hook_type.toLowerCase(),
          'org': this.currentUser.org_id,
          'body': data
        }
        this.service.subscribeToEvent(this.id, subsData)
        .subscribe(
          response => {
            console.log('Subscribed', response);
            this.formData.user_subscribed = true;
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Success!', detail:"You are subscribed!"});
          },
          error => {
            console.log('ERROR', error);
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error!', detail:error.detail});
          }
        );
      }
    }
  }

  unsubscribe(){
    let hook = this.subscribed[0].id;
    this.service.unsubscribeToEvent(hook)
    .subscribe(
      response => {
        console.log('Unsubscribed', response);
        this.formData.user_subscribed = false;
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

  setCenter() {
    // this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));
    const self = this;
    let map = this.map
    var mapProp = {
      center: new google.maps.LatLng(this.latitude, this.longitude),
      zoom: this.map.getZoom(),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);


    let location = new google.maps.LatLng(this.latitude, this.longitude);


    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      title: '',
    });

    let circle = new google.maps.Circle({
            strokeColor: '#0000FF',
            strokeOpacity: 1.0,
            strokeWeight: 1,
            fillColor: '#3366FF',
            fillOpacity: 0.5,
            map: this.map,
            center: location,
            radius: this.radius,
            editable: true,
        })

  // circle.addListener('radius_changed', this.simpleMarkerHandler);
    google.maps.event.addListener(circle,'radius_changed',function(){
      self.radius = this.getRadius();
    })

    google.maps.event.addListener(this.map, 'click', function(event) {
      self.changePosition(event);
    })

  }

  changePosition(event){
    let myLatLng = event.latLng;
    this.latitude = myLatLng.lat();
    this.longitude = myLatLng.lng();

    this.setCenter();
  }

  subscribeEvent(){
    console.log(this.radius, this.latitude, this.id)
    if (this.maxMoisture || this.minMoisture || this.formData.service_id !== "MoistureService"){
      let data = {
        latitude: this.latitude,
        longitude: this.longitude,
        radius: this.radius,
        minMoisture: this.minMoisture,
        maxMoisture: this.maxMoisture
      }
      this.subscribeToEvent(data)
    } else {
      this.msgs = [];
      this.msgs.push({severity:'error', summary:'Error!', detail:"Must have at least one value entered for maximum moisture or for minimum moisture"});
    }
  }
}
