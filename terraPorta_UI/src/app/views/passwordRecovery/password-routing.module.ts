import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PasswordComponent } from './password.component';
import { RecoveryPasswordComponent } from './recovery_password.component';

const routes: Routes = [
  {
    path: '',
    component: PasswordComponent,
    data: {
      title: 'Password Recovery Page'
    }
  },
  {
    path: ':code',
    component: RecoveryPasswordComponent,
    data: {
      title: 'Password Recovery Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule {}
