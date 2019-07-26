import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';
import { OrgDetailsComponent } from './orgDetails.component';
import { OrgsResolver } from './resolvers/orgs.resolver.service';
import { OrgDetailResolver } from './resolvers/org.detail.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent,
    resolve: {
        orgs: OrgsResolver
    },
    data: {
      title: 'Organizations'
    }
  },
  {
    path: ':id',
    component: OrgDetailsComponent,
    resolve: {
        org: OrgDetailResolver
    },
    data: { method: 'GET' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule {}
