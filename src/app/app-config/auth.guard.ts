import { CanActivateFn, RouterStateSnapshot } from '@angular/router';
import keycloak from './keycloak';
import { environment } from './env.dev';

export const AuthGuard: CanActivateFn = (
  route,
  state: RouterStateSnapshot
) => {

  if (!environment.authEnabled) {
    return true;
  }
  
  if (keycloak.authenticated) {
    return true;
  }

  keycloak.login({
    redirectUri: window.location.origin + state.url
  });

  return false;
};