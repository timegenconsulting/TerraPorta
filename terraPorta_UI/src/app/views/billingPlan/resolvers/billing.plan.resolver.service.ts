import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { BillingPlanService } from '../billingPlanService';

@Injectable()
export class BillingPlanResolver implements Resolve<any> {

  constructor(
    private service: BillingPlanService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return this.service.getBillingPlans().map(
          plans => {
              if (plans){
                  return plans;
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
