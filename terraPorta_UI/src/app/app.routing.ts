import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from "./auth/auth-guard.service"
// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        // canLoad: [AuthGuardService],
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'organizations',
        canActivate: [AuthGuardService],
        loadChildren: './views/organizations/organizations.module#OrganizationsModule'
      },
      {
        path: 'events',
        canActivate: [AuthGuardService],
        loadChildren: './views/events/events.module#EventsModule'
      },
      {
        path: 'user',
        canActivate: [AuthGuardService],
        loadChildren: './views/account/account.module#AccountModule'
      },
      {
        path: 'billing_plan',
        canActivate: [AuthGuardService],
        loadChildren: './views/billingPlan/billingPlan.module#BillingPlanModule'
      },
      {
        path: 'billing',
        canActivate: [AuthGuardService],
        loadChildren: './views/billing/billing.module#BillingModule'
      },
      {
        path: 'billing_history',
        canActivate: [AuthGuardService],
        loadChildren: './views/billingHistory/billingHistory.module#BillingHistoryModule'
      }
    ]
  },
  {
    path: 'login',
    component: SimpleLayoutComponent,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: '',
        loadChildren: './views/login/login.module#LoginModule',
      }
    ]
  },
  {
    path: 'register',
    component: SimpleLayoutComponent,
    data: {
      title: 'Register'
    },
    children: [
      {
        path: '',
        loadChildren: './views/register/register.module#RegisterModule',
      }
    ]
  },
  {
    path: 'user_invitation/:code',
    component: SimpleLayoutComponent,
    data: {
      title: 'User Invitation'
    },
    children: [
      {
        path: '',
        loadChildren: './views/userInvitation/invite.module#InviteModule',
      }
    ]
  },
  {
    path: 'user_activation/:code',
    component: SimpleLayoutComponent,
    data: {
      title: 'User Activation'
    },
    children: [
      {
        path: '',
        loadChildren: './views/userActivation/activation.module#ActivationModule',
      }
    ]
  },
  {
    path: 'recovery_password',
    component: SimpleLayoutComponent,
    data: {
      title: 'Password Recovery'
    },
    children: [
      {
        path: '',
        loadChildren: './views/passwordRecovery/password.module#PasswordModule',
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    // canActivateChild: [AuthService],
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
