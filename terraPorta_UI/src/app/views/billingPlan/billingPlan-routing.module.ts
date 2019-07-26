import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillingPlanComponent } from './billingPlan.component';
import { BillingPlanDetailsComponent } from './billingPlanDetails.component';
import { BillingPlanResolver } from './resolvers/billing.plan.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: BillingPlanComponent,
    resolve: {
        plans: BillingPlanResolver
    },
    data: {
      title: 'Billing Plan Page'
    }
  },
  {
    path: ':id',
    component: BillingPlanDetailsComponent,
    data: {
      title: 'Billing Plan Details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingPlanRoutingModule {}
