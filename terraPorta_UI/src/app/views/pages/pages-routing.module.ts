import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { P403Component } from './403.component';
import { P200InviteComponent } from './200Invite.component';
import { P201Component } from './201.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Example Pages'
    },
    children: [
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404'
        }
      },
      {
        path: '500',
        component: P500Component,
        data: {
          title: 'Page 500'
        }
      },
      {
        path: '403',
        component: P403Component,
        data: {
          title: 'Page 403'
        }
      },
      {
        path: 'success_invite',
        component: P200InviteComponent,
        data: {
          title: 'Page Success Invite'
        }
      },
      {
        path: 'success',
        component: P201Component,
        data: {
          title: 'Page Success Registration'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
