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
export class BillingHistoryService {

    private apiUrl = environment.api_url;


    constructor(
        private http: HttpService,
        private router: Router
    ){}

    getBillingHistory(): Observable<any> {
        return this.http.get(`${this.apiUrl}/billing_history/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
}
