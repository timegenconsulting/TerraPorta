import { Injectable } from "@angular/core"
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from 'environments/environment';
import { HttpService } from 'app/auth/http.service';


@Injectable()
export class AccountService {

    private apiUrl = environment.api_url;


    constructor(
        private http: HttpService,
        private ht: Http
    ){}


    getUserDetail(id): Observable<any> {
        return this.http.get(`${this.apiUrl}/users/${id}/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    getUser(): Observable<any> {
        return this.http.get(`${this.apiUrl}/users/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    updateAccount(body: Object): Observable<any> {
        return this.http.put(`${this.apiUrl}/users/`, body)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
}
