import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingHistoryComponent } from './billingHistory.component';
import { BillingHistoryResolver } from './resolvers/billing.history.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: BillingHistoryComponent,
    resolve: {
        history: BillingHistoryResolver
    },
    data: {
      title: 'Billing History Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingHistoryRoutingModule {}
