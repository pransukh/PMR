import keycloak from './keycloak';
import { environment } from './env.dev';

export function initKeycloak(): Promise<boolean> {
  if (!environment.authEnabled) {
    return Promise.resolve(true);
  }
  
  return keycloak.init({
    onLoad: 'login-required',
    checkLoginIframe: false
  });
}