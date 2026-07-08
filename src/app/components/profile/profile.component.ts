import { Component } from '@angular/core';
import { Router } from '@angular/router';
import keycloak from '../../app-config/keycloak';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {

  constructor(private router: Router) {}
  
  user: any = keycloak.tokenParsed ?? {};

  logout() {
    keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  patientSearch(){
    this.router.navigate(['/patient-search']);
  }
}