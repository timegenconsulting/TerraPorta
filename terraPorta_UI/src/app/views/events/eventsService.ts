import { Injectable } from "@angular/core"
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from 'environments/environment';
import { HttpService } from 'app/auth/http.service';


@Injectable()
export class EventsService {

    private apiUrl = environment.api_url;


    constructor(
        private http: HttpService,
        private ht: Http
    ){}


    getEvents(): Observable<any> {
        return this.http.get(`${this.apiUrl}/events/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }

    getEventServices(): Observable<any> {
        return this.http.get(`${this.apiUrl}/eventservices/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
            });
    }
    addEvent(body: Object): Observable<any> {
      return this.http.post(`${this.apiUrl}/events/`, body)
           .map((res:Response) => res.json())
           .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    removeEvent(id): Observable<any> {
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         return this.http.delete(`${this.apiUrl}/event/${id}/`, options)
          .map( (res:Response) => res.json())
          .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    getEvent(id): Observable<any> {
        return this.http.get(`${this.apiUrl}/event/${id}/`)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    updateEvent(body: Object): Observable<any> {
      return this.http.put(`${this.apiUrl}/event/${body['id']}/`, body)
           .map((res:Response) => res.json())
           .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    subscribeToEvent(id, body: Object): Observable<any> {
        return this.http.post(`${this.apiUrl}/create_hook/${id}/`, body)
            .map((res:Response) => res.json())
            .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }
    unsubscribeToEvent(id): Observable<any> {
         let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });

         return this.http.delete(`${this.apiUrl}/create_hook/${id}/`, options)
          .map( (res:Response) => res.json())
          .catch(error => {
                return Observable.throw(error.json() || 'Server error');
              });
    }

}
