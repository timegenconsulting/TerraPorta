import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InviteComponent } from './invite.component';

const routes: Routes = [
  {
    path: '',
    component: InviteComponent,
    data: {
      title: 'Invite Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteRoutingModule {}
