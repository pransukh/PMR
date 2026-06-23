import { Component } from '@angular/core';
import keycloak from '../app-config/keycloak';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {

  user: any = keycloak.tokenParsed ?? {};

  logout() {
    keycloak.logout({
      redirectUri: window.location.origin
    });
  }
}