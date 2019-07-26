import { Injectable } from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { environment } from 'environments/environment';

@Injectable()
export class ActivationService {

    private apiUrl = environment.api_url;


    constructor(
        private http: Http,
        private router: Router
    ){}

    PutActivation(code): Observable<any> {
        return this.http.put(`${this.apiUrl}/activation/${code}/`, {})
          .map((response: Response) => {
            console.log("response ", response.json());
            return response.json();
          })
          .catch(error => {
            console.log(error.json())
            return Observable.throw(error.json() || 'Server error');
          });
    }
}
