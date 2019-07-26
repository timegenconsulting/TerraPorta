import { Injectable } from "@angular/core"
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router"
// import { Observable } from "rxjs/Observable"
// import { Router, Route, NavigationStart } from "@angular/router"
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable()
export class AuthService {
    jwtHelper = new JwtHelperService();

    constructor(){}

    public isAuthentecated(): boolean {
        const token = localStorage.getItem('authToken')
        const tokenExpired: boolean = this.jwtHelper.isTokenExpired(token);
        if (!tokenExpired){
            const decodedToken = this.jwtHelper.decodeToken(token);
            if(decodedToken){
                localStorage.setItem('currentUser', JSON.stringify(decodedToken));
            }
        }

        return !tokenExpired
    }
}


// @Injectable()
// export class AuthService implements CanActivate {

//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//         console.log("Can activate was called");
//         return true;
//     }

//     canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
//         console.log("Can activate was called");
//         return true;
//     }

//     canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
//       console.log("Can activate was called");
//       return true;
//     }
// }
