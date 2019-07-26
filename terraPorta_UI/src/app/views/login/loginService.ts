import { Injectable } from '@angular/core';
import { CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { environment } from 'environments/environment';

@Injectable()
export class LoginService {

    private apiUrl = environment.api_url + '/token/';


    constructor(
        private http: Http,
        private router: Router
    ){}

    login(username: string, password: string): Observable<boolean> {
      return this.http.post(this.apiUrl, {'username': username, 'password': password})
        .map((response: Response) => {
            console.log("Data after login: ", response.json()['token']);
            let token = response.json()['token'];
            localStorage.setItem('authToken', token);
            return true;
        })
        .catch(error => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
          let getError = error.json()['non_field_errors'][0];
          return Observable.throw(getError || 'Server error');
        });
    }
}
