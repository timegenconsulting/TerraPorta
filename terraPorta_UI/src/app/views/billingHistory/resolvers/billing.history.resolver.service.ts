import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BillingHistoryService } from '../billingHistoryService';

@Injectable()
export class BillingHistoryResolver implements Resolve<any> {

  constructor(
    private service: BillingHistoryService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return this.service.getBillingHistory().map(
          history => {
              if (history){
                  return history;
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
