import { Injectable } from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { environment } from 'environments/environment';

@Injectable()
export class PasswordService {

    private apiUrl = environment.api_url;


    constructor(
        private http: Http,
        private router: Router
    ){}

    recoveryPassword(body: Object): Observable<boolean> {
      return this.http.post(`${this.apiUrl}/password_recovery/`, body)
        .map((response: Response) => {
            console.log("response ", response);
            return true;
        })
        .catch(error => {
          console.log(error.json())
          return Observable.throw(error.json() || 'Server error');
        });
    }
    putRecoveryPassword(code, body: Object): Observable<boolean> {
      return this.http.put(`${this.apiUrl}/password_recovery/${code}/`, body)
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
