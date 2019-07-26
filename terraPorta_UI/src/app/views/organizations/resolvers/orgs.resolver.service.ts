import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { OrganizationsService } from '../orgsService';

@Injectable()
export class OrgsResolver implements Resolve<any> {

  constructor(
    private service: OrganizationsService,
    private _location: Location
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return this.service.getOrgs().map(
          orgs => {
              if (orgs){
                  return orgs;
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
