import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { EventsService } from '../eventsService';

@Injectable()
export class EventDetailResolver implements Resolve<any> {

  constructor(private service: EventsService, private _location: Location) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.params['id'];
    console.log("route params", route.params)
    return this.service.getEvent(id).map(
        event => {
            if (event){
                return event;
            }
            else {
                this._location.back();
                return null;
            }
        }
    );
  }

}
