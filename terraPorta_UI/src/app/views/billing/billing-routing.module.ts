import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingComponent } from './billing.component';
import { BillingResolver } from './resolvers/billing.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: BillingComponent,
    resolve: {
        billing: BillingResolver
    },
    data: {
      title: 'Billing Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule {}
