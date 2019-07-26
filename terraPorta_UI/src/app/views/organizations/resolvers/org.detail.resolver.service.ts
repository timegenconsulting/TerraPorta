import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { OrganizationsService } from '../orgsService';

@Injectable()
export class OrgDetailResolver implements Resolve<any> {

  constructor(private service: OrganizationsService, private _location: Location) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.params['id'];

    return this.service.getOrg(id).map(
        org => {
            if (org){
                return org;
            }
            else {
                this._location.back();
                return null;
            }
        }
    );
  }

}
