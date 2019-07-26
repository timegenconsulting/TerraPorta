import { Injectable } from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { environment } from 'environments/environment';

@Injectable()
export class InviteService {

    private apiUrl = environment.api_url;


    constructor(
        private http: Http,
        private router: Router
    ){}

    GetInviteActivation(code): Observable<any> {
        return this.http.get(`${this.apiUrl}/user_activation/${code}/`)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().detail || 'Server error'))
     }
     PutInviteActivation(code, body: Object): Observable<any> {
        return this.http.put(`${this.apiUrl}/user_activation/${code}/`, body)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().detail || 'Server error'))
     }
}
