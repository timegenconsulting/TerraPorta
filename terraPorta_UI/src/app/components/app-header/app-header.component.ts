import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

   constructor(
    private router: Router
  ) { }

   logOut(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
  }

  getProfile(){
    this.router.navigate(['user']);
  }
}
