import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UnsubscribedEmailComponent } from './pages/unsubscribed-email/unsubscribed-email.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'email',
    component: UnsubscribedEmailComponent,
  }
];
