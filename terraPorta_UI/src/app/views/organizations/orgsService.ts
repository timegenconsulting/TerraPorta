import { Injectable } from "@angular/core"
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from 'environments/environment';
import { OrganizationsModel } from './orgs.model';
import { HttpService } from 'app/auth/http.service';


@Injectable()
export class OrganizationsService {

    private apiUrl = environment.api_url;


    constructor(
        private http: HttpService,
        private ht: Http
    ){}


    getOrgs(): Observable<OrganizationsModel[]> {
         return this.http.get(`${this.apiUrl}/orgs/`)
             .map((res: Response) => res.json())
             .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }

    getOrg(id): Observable<OrganizationsModel> {
        return this.http.get(`${this.apiUrl}/orgs/${id}/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }

    updateOrg (body: Object): Observable<OrganizationsModel> {
      return this.http.put(`${this.apiUrl}/orgs/${body['id']}/`, body)
           .map((res:Response) => res.json())
           .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }

    removeOrg(id): Observable<OrganizationsModel> {
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         return this.http.delete(`${this.apiUrl}/orgs/${id}/`, options)
          .map( (res:Response) => res.json())
          .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
     }
     inviteUsers(id, body: Object): Observable<any> {
        return this.http.post(`${this.apiUrl}/invite_users/${id}/`, body)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
     }
}
