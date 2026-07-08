import { Routes } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import PatientSearch from '../components/patient/patientSearch/patientSearch.component';
import PatientDetails from '../components/patient/patientDetails/patientDetails.component';
import Dashboard from '../components/dashboard/dashboard.component';
import Appointments from '../components/appointments/appointments.component';
import AppointmentScheduling from '../components/appointmentScheduling/appointmentScheduling.component';
import PatientRegistration from '../components/patient/patientRegistration/patientRegistration.component';

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
  },
  {
    path: 'patients',
    component: PatientSearch
  },
  {
    path: 'patient/detail/:id',
    component: PatientDetails
  },
  {
    path: 'patient/new',
    component: PatientRegistration
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
  {
    path: 'appointments',
    component: Appointments
  },
  {
    path: 'appointments/new',
    component: AppointmentScheduling
  },
  {
    path: 'patient/detail/:id',
    component: PatientDetails
  },
  {
    path: 'users',
    component: Dashboard
  },
  {
    path: 'reports',
    component: Dashboard
  },
  {
    path: 'settings',
    component: Dashboard
  },

  // {
  //   path: 'patient-registration',
  //   component: PatientRegistration,
  //   resolve: {
  //     lookups: LookupResolver
  //   }
  // }
];