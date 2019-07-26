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
export class BillingPlanService {

    private apiUrl = environment.api_url;


    constructor(
        private http: HttpService,
        private router: Router
    ){}

    getBillingPlans(): Observable<any> {
        return this.http.get(`${this.apiUrl}/billing_plans/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }

    getBillingProviders(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get_providers/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }

    addBillingPlan(body: Object): Observable<any> {
        return this.http.post(`${this.apiUrl}/billing_plans/`, body)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }

    removeBillingPlan(id): Observable<any> {
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         return this.http.delete(`${this.apiUrl}/billing_plan/${id}/`, options)
          .map( (res:Response) => res.json())
          .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    getBillingPlan(id): Observable<any> {
        return this.http.get(`${this.apiUrl}/billing_plan/${id}/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    updateBillingPlan(body: Object): Observable<any> {
      return this.http.put(`${this.apiUrl}/billing_plan/${body['id']}/`, body)
           .map((res:Response) => res.json())
           .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
}

