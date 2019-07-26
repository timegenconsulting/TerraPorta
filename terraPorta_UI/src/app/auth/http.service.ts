// this service adds authorization header to every request
// it extends angular Http service
import { Router } from '@angular/router';
import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {

  constructor (
    backend: XHRBackend,
    options: RequestOptions,
    private router: Router,
  ) {
    super(backend, options);
    let token = localStorage.getItem('authToken'); // your custom token getter function here
    options.headers.set('Authorization', token);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('authToken');
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', "JWT "+ token);
    } else {
    // we have to add the token to the url object
      url.headers.set('Authorization', "JWT "+ token);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      if (res.status === 401) {
        // if not authenticated
        console.log("Token might be expired or invalid ", res);
        // if token expired or invalid
        if (localStorage.getItem('authToken')) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/']);
        }
      }

      if (res.status === 403) {
        // if doesn't have permission
        // alert(res.json().error.message);
        console.log('ERROR', res.json().error.message);
        this.router.navigate(['pages/403'])
      }
      return Observable.throw(res);
    };
  }
}
