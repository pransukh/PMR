import { Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { AuthGuard } from '../auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];