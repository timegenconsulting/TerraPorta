import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BillingService } from '../billingService';

@Injectable()
export class BillingResolver implements Resolve<any> {

  constructor(
    private service: BillingService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return this.service.getBillingKey().map(
          billing => {
              if (billing){
                  return billing;
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
