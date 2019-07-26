import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { EventsComponent } from './events.component';
import { EventDetailsComponent } from './event.details.component';
import { EventInfoComponent } from './event.info.component';
import { EventsResolver } from './resolvers/events.resolver.service';
import { EventDetailResolver } from './resolvers/event.detail.resolver.service';

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    resolve: {
        events: EventsResolver
    },
    data: {
      title: 'Events'
    }
  },
  {
    path: ':id',
    component: EventDetailsComponent,
    resolve: {
        event: EventDetailResolver
    },
    data: {
      title: 'Event Details'
    }
  },
  {
    path: 'billing/info',
    component: EventInfoComponent,
    data: {
      title: 'Event Info'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
