import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { EventsService } from '../eventsService';

@Injectable()
export class EventsResolver implements Resolve<any> {

  constructor(
    private service: EventsService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return this.service.getEvents().map(
          events => {
              if (events){
                  return events;
              }
              else {
                  this._location.back();
                  return null;
              }
          }
      )
      .catch(error => {
        return [];
      });
  }

}
