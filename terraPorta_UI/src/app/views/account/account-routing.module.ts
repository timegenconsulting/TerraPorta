import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { AccountDetailComponent } from './accountDetail.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    data: {
      title: 'Account'
    }
  },
  {
    path: ':id',
    component: AccountDetailComponent,
    data: {
      title: 'Account Detail'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
