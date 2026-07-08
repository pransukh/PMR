import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'Realm-CompSom',
  clientId: 'angular-dev-auth'
});

export default keycloak;