import { Injectable } from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { environment } from 'environments/environment';
import { HttpService } from 'app/auth/http.service';

@Injectable()
export class BillingService {

    private apiUrl = environment.api_url;


    constructor(
        private http: HttpService,
        private router: Router
    ){}

    getBillingKey(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get_charge/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    charge(body: Object): Observable<any> {
        return this.http.post(`${this.apiUrl}/charge/`, body)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
}
