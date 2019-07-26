import { Injectable } from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { environment } from 'environments/environment';

@Injectable()
export class RegisterService {

    private apiUrl = environment.api_url;


    constructor(
        private http: Http,
        private router: Router
    ){}

    registry(body: Object): Observable<boolean> {
      return this.http.post(`${this.apiUrl}/users/`, body)
        .map((response: Response) => {
            console.log("response ", response);
            return true;
        })
        .catch(error => {
          console.log(error.json())
          return Observable.throw(error.json() || 'Server error');
        });
    }
}
