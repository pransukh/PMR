import { CanActivateFn, RouterStateSnapshot } from '@angular/router';
import keycloak from './keycloak';

export const AuthGuard: CanActivateFn = (
  route,
  state: RouterStateSnapshot
) => {

  if (keycloak.authenticated) {
    return true;
  }

  keycloak.login({
    redirectUri: window.location.origin + state.url
  });

  return false;
};